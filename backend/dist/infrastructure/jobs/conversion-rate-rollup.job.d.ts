import { DataSource } from 'typeorm';
export declare class ConversionRateRollupService {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    handleRefresh(): Promise<void>;
}
