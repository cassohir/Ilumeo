# Documentação Completa

Como requisito obrigatório esta documentação faz parte da explicação e detalhamneto do processo de desenvolvimento, escolhas feitas em termos de arquitetura, bem como, as escolhas feitas no quesito otimização de performance de trade-offs.

# Evolução Temporal da Taxa de Conversão por Canal

- Este repositório contém a implementação de um serviço Backend em Node.js (NestJS) com um Frontend em React para exibir a evolução temporal da taxa de conversão (por canal: e-mail, WhatsApp, push, Mobile etc.) a partir de um grande volume de dados (milhões de registros). A aplicação está completamente dockerizada e inclui testes..

### 1) Contexto e Objetivo

Recebi um SQL contendo milhões de registros de envios de mensagens (canais: e-mail, WhatsApp, push, Mobile). Cada registro contém:

#### users_surveys_responses_aux

| Coluna               | Tipo        | Descrição                                                                       |
| -------------------- | ----------- | ------------------------------------------------------------------------------- |
| `id`                 | `bigint`    |                                                                                 |
| `origin`             | `varchar`   | `Canal (email, wpp, MOBILE)`                                                    |
| `response_status_id` | `int`       | `1-6: Válido Inválido Incompleto Pendente Aberto Visualizou`                    |
| `created_at`         | `timestamp` | `Criei e fiz um update batch para otimizar a distribuição das taxas e as datas` |

#### Objetivo Principal..

- Criar uma API que retorne a evolução temporal da taxa de conversão por canal.

- Garantir que, mesmo com um volume tão grande de dados, as respostas sejam rápidas e escaláveis.

- Construir um Frontend em React que apresente o dashboard da evolução, com filtros adicionais.

- Adicionar testes para garantir confiabilidade.

# Tecnologias Escolhidas

- Para o desafio foi permitido Node js ou Golang.

### Linguagem: Typescript (Node js)

**Por quê?**

- Ecossistema maduro para microserviços e bibliotecas de testes
- Ótima familiaridade com Node.js | Typescript
- E o principal para o meu caso, foi desenvolvimento rápido, dado o contexto e prazo do projeto!

### Framework (NestJs)

**Por quê?**

- Arquitetura modular baseada em decorators, facilitando a organização de código.
- Suporte integrado a módulos de agendamento (`@nestjs/schedule`), cache (`@nestjs/cache-manager`) e integração com TypeORM.
- Convenções claras para controllers, services e módulos, acelerando o desenvolvimento.

### ORM: TypeORM

**Por quê?**

- Mapeamento de entidades e views (`ViewEntity`) out-of-the-box
- Fácil migração e sincronização de esquemas.
- Suporte rápido e fácil a lazy-loading, query builders e relacionamentos.
- Também posso destacar minha experiência pessoal positiva no desenvolvimento, mais inclusive do que com outros ORM's famosos (como Prisma)

### Cache: Redis via `cache-manager-redis-store`

**Por quê?**

- Reduz latência em leituras frequentes (queries de séries temporais).
- TTL configurável a nível de chave para manter dados "quentes" por um período interessante...

### Agendamento: `@nestjs/schedule`

**Por quê?**

- Necessidade de atualizar a Materialized View diariamente (zero downtime).
- Suporte a Jobs em cron.

### Testes: Jest + Supertest

**Por quê?**

- **Jest**: Framework consolidado para testes em TypeScript, com suporte a mocking/fake timers.
- **Supertest**: Integração simples para testar endpoints REST.

### Banco de Dados

#### SGBD: PostgreSQL

**Por quê?**

- Era um requisito obrigatório, mas é o o banco que mais uso pessoalmente em meus projetos!
- Suporte nativo a particionamento, materialized views, filtragem por range e filtros com `COUNT(*) FILTER (…)`.
- Bom desempenho em agregações analíticas (com índices e roll-ups).

### Containerização

#### Docker para empacotar o backend, e banco de dados em contêineres.

#### Docker Compose para orquestrar múltiplos serviços (API, Redis, Postgres).

**Por quê?**

- Facilita setup local e ambiente de CI/CD.
- Garante consistência entre desenvolvimento e produção..

## Fluxo de Dados Simplificado

### 1. Importação dos Dados

- O arquivo `case_tech_lead.sql` com milhões de registros disponibilizado é executado localmente no contêiner PostgreSQL. Eu pessoalmente gosto e utilizei o psql:

```bash
psql -h localhost -p 5432 -U postgres -d postgres -f ./case_tech_lead.sql
```

- **ATENÇÃO:** Não foi necessarimamente requisitado, mas eu executei um script, que inclusive, não é o melhor no quesito desempenho, mas garante uma boa aleatoriedade, para atualizar as datas dos registros e a distribuição dos canais e status de forma aleatória.
  _"Mas Cássio, por que não criar uma data aleatória durante o próprio insert do arquivo `case_tech_lead.sql`?"_

_" - Nesse caso optei por deixar a arquitetura limpa e como é um projeto público, não quiz deixar fixo para que todos tenham o mesmo comportamento que obtive e nem que conforme o projeto pudesse crescer novas inserções continuassem sendo aleatórias. Ou seja, mesmo demorando um bom tempo para rodar o script, é um comportamento pessoal e consciente que escolhi"_

- Veja abaixo o SQL utilizado:

```sql
DO $$
DECLARE
  start_date  DATE := DATE '2025-01-01';
  end_date    DATE := CURRENT_DATE;
  num_days    INTEGER := end_date - start_date + 1;
  batch_size  INTEGER := 10000;
  batch_offset INTEGER := 0;
  rows_affected INTEGER;
BEGIN
  -- 10.000 registros por vez..
  LOOP
    WITH sequenced AS (
      SELECT
        id,
        FLOOR(RANDOM() * num_days)::INT AS day_offset
      FROM inside.users_surveys_responses_aux
      ORDER BY id
      LIMIT batch_size OFFSET batch_offset
    )
    UPDATE inside.users_surveys_responses_aux AS usra
    SET created_at = (start_date + s.day_offset)
    FROM sequenced AS s
    WHERE usra.id = s.id;


    GET DIAGNOSTICS rows_affected = ROW_COUNT;

    EXIT WHEN rows_affected < batch_size;

    batch_offset := batch_offset + batch_size;
  END LOOP;
END;
$$;


```

- A tabela base `inside.users_surveys_responses_aux` é criada com os campos: `id`, `origin`, `response_status_id`, `created_at`.

---

### 2. Particionamento + Materialized View (no PostgreSQL)

- **Particionamento:** Particionamento por mês na tabela `users_surveys_responses_aux` para "limitar" full scans. (_Foi descontinuado, por já ter um ótimo desempenho com as Materialized Views:_
- **Materialized View Diária:** A `inside.mv_daily_conversion_rate` pré-agrega a contagem de envios e conversões por `origin` × `dia`.
- **Job Agendado:** Um job agendado (cron) em NestJS executa `REFRESH MATERIALIZED VIEW CONCURRENTLY` todo dia à meia-noite.

---

### 3. Consulta na API

1. O Frontend (React) faz uma requisição GET para:

```http
/conversion-rate?channel=email&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&page=1&limit=30
```

2. O Controller chama o método `ConversionRateService.getConversionRateEvolution(queryParms)`.

3. O Service tenta obter os dados do Redis Cache usando uma chave composta pelos parâmetros.

- **Cache Hit:** Retorna os dados imediatamente (em formato JSON).
- **Cache Miss:** Executa um Query Builder sobre a view `inside.mv_daily_conversion_rate` com:
  - `WHERE day BETWEEN … AND origin = … ORDER BY day LIMIT/OFFSET`.

4. O resultado da consulta é armazenado no Redis com um TTL (Time To Live) de 1 hora (está configurável).

5. Retorna o JSON ao cliente.

### 4. Dashboard Frontend

- Recebe o JSON com array dos objetos:

```json
[
  "data": {
    "channel": "email",
    "day": "2025-05-01T00:00:00.000Z",
    "totalSends": 1000,
    "totalConverts": 120,
    "conversionRate": 12.00
  },
  // …
  "pagination": {
        "page": 1,
        "limit": 30,
        "totalItems": 30,
        "totalPages": 1,
  },
]
```

- Plota gráfico de linha (evolução dia a dia).

### 5 - Materialized View Diária

- Para entregar rapidamente a taxa de conversão diária por canal, criei uma materialized view que já pré-agrega:

```sql
CREATE MATERIALIZED VIEW inside.mv_daily_conversion_rate AS
SELECT
  origin AS channel,
  date_trunc('day', created_at) AS day,
  COUNT(id) AS total_sends,
  COUNT(response_status_id) FILTER (WHERE response_status_id = 1) AS total_converts
FROM inside.users_surveys_responses_aux
GROUP BY origin, date_trunc('day', created_at);
```

#### Explicação:

- **total_sends:** Total de envios (qualquer status) naquele canal e dia.
- **total_converts:** Total de envios com `response_status_id = 1` (Válido) naquele canal e dia.

O **conversion_rate** pode já vir como número multiplicado por 100 e com casas decimais, ou pode ser calculado na query de leitura diretamente, (que foi a opção que escolhi posteriormente).

### Índice na View para Filtros Rápidos

A criação de índices na view pode ser aplicada para acelerar a consulta com filtros rápidos, garantindo performance otimizada em buscas por canal, dia ou status.

```sql
CREATE INDEX mv_daily_idx_origin_day
 ON inside.mv_daily_conversion_rate (channel, day);

```

### Refresh automático: usamos um job cron em NestJS:

```javascript
// ConversionRateRollupService (NestJS)
@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
async handleRefresh() {
  await this.dataSource.query(`
    REFRESH MATERIALIZED VIEW CONCURRENTLY inside.mv_daily_conversion_rate
  `);
}
```

## Estratégia de Cache (Redis)

**Por quê?**

- Mesmo com a Materialized View (MV), consultar dia a dia de 5 canais para intervalos grandes pode ser uma operação cara e repetitiva.
- Com Redis, qualquer requisição idêntica (mesmos parâmetros: `channel`, `startDate`, `endDate`, `page`, `limit`) em um intervalo curto dde tempo retorna em milissegundos.

- _TTL: 1 hora (que pode ser configurável...)_

### Chave de Cache:

Formato da chave de cache:

```javascript
conv:{channel}:{startDate}:{endDate}:{offset}:{limit}
```

---

### Fluxo:

1. O **Service** verifica com `await cacheService.get(cacheKey);`
   - Se existir, retorna imediatamente o cache.
   - Se não existir, executa a query na MV, obtém os resultados (`rows`), faz `cacheServic.set(cacheKey, rows, { ttl: … })` e retorna os dados.

## Trade-offs e Racional

### Materialized View vs. Tabela de Roll-up Manual

#### Materialized View

A Materialized View (MV) nativa do PostgreSQL facilita a criação e atualização com o comando `REFRESH`.

**Prós:**

- Muuito simples de criar e gerenciar.
- Índices são reaproveitados...
- Suporte a `CONCURRENTLY` para zero-downtime.

**Contras:**

- Ocupa espaço extra.
- O `REFRESH` em tabelas muito grandes pode demorar (mas se particionadas, o custo é reduzido).
- _Como mencionado anteriormente, eu preferi não dar continuidade com o particionamento, mas na migration CreatePartitionByRange1748476048461 é possível ver mais detalhes de como seria uma possível implementação.._

### Alternativa: Tabela de Roll-up Manual

Criar uma tabela física (por exemplo, `daily_conversion_rollup`) e populá-la via ETL incremental.

**Por que não fiz?**

- A execução manual de ETL traz complexidade extra, e a MV atende ao requisito sem precisar de código adicional no banco.

---

### Particionamento

O particionamento ajuda a reduzir o custo de agregações e leitura no histórico.

**Trade-off:**

- Complexidade para criar novas partições a cada mês (manual ou via script).
- A manutenção de índices em cada partição.

**Por que eu optei por essa escolha a princípio?**

- O volume de dados ("milhões") justifica o particionamento para evitar full-scans.
- Particionamento by RANGE é bem suportado nativamente pelo PostgreSQL.

---

### Cursor-Based Pagination vs. Offset-Based

Inicialmente, implementei **offset-based pagination** (usando `LIMIT … OFFSET …`) por simplicidade mesmo.

**Desvantagem:**

- Páginas muito altas podem ficar lentas no MV, embora o MV nesse projeto seja relativamente pequeno.

**Possível evolução:**

- Trocar para **cursor-based pagination** (usando `day < lastCursor + ORDER BY day DESC LIMIT n`).

**Por que manter o offset agora então??**

- Simplicidade e a expectativa de que a MV diária terá poucas centenas ou milhares de linhas por canal (um ano ≈ 365 dias).

### Escolha de Node.js/NestJS

**Prós:**

- Alta produtividade, sintaxe familiar, TypeScript.
- Grande comunidade e pacotes maduros que funcionam muito bem para soluções de agendamento, cache e testes.

**Contras:**

- Não é tão "performático" quanto Golang para operações CPU-bound, mas nossa carga é majoritariamente I/O (interação com o BD + Redis).

**Por que não Golang?**

- Pessoalmente, devido ao prazo e familiariadade, o avanço de protótipo para mim é mais rápido com NestJS + TypeORM.
- E porque o Nest tem esse ecossistema de bibliotecas maduras para agendamento e cache em Node.

## Possíveis Melhorias Futuras

### 1. Cursor-Based Pagination

- Implementar `day < :lastCursor + ORDER BY day DESC LIMIT n` para evitar o custo elevado do `OFFSET` em grandes conjuntos de dados.

---

### 2. Granularidade Ajustável no Backend

- Além da **MV diária**, criar as views `mv_weekly_conversion_rate` e `mv_monthly_conversion_rate`.
- Expor o parâmetro `granularity=day|week|month` na rota `/conversion-rate`, ajustando o uso de `date_trunc(...)` para a granularidade desejada.

---

### 3. Roll-up Incremental

- Em vez de usar `REFRESH MATERIALIZED VIEW`, criar uma rotina que apenas atualize os "novos" dias.
  - Exemplo: usar `INSERT/UPDATE` em uma tabela de roll-up..

---

### 4. Automação de Criação de Novas Partições Mensais

- Implementar um job que execute no início de cada mês para criar novas partições na tabela `users_surveys_responses_aux`.
  - Exemplo: um script Node.js que executa DDL via `dataSource.query(...)`.

---

### 5. Monitoramento e Métricas

- Configurar alertas caso o **REFRESH MATERIALIZED VIEW** demore mais do que o esperado.

---

_Usei o readme.so para fazer essa documentação! ..._
