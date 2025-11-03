import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

interface FeedbackData {
    forename: string;
    email: string;
    message: string;
}

const records = parse(fs.readFileSync(path.join(__dirname, '..', 'test-data', 'feedbackData.csv')), {
    columns: true,
    skip_empty_lines: true
}) as FeedbackData[];

export { records };