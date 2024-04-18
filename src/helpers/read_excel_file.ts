import { Contact } from "models/Contact";
import * as XLSX from "xlsx";

export class ExcelReader {
    static getData(file: File): Promise<Contact[]> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const data = new Uint8Array(event.target?.result as ArrayBufferLike);
                const workbook = XLSX.read(data, { type: 'array' });

                const result: Contact[] = [];

                workbook.SheetNames.forEach((sheetName) => {
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Array<(keyof Contact)[]>;

                    const sheetData = ExcelReader.mapExcelData(jsonData);

                    for (const sheet of sheetData) {
                        result.push(sheet);
                    }
                });

                resolve(result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    static mapExcelData(excelData: Array<(keyof Contact)[]>): Contact[] {
        const headers: Array<keyof Contact> = excelData[0];
        const data: Contact[] = [];
        excelData.slice(1).forEach((element) => {
            data.push(ExcelReader.mapExcelHeaders(headers, element));
        });
        return data;
    }

    static mapExcelHeaders(headers: Array<keyof Contact>, data: any): Contact {
        const mappedData: Partial<Contact> = {};
        headers.forEach((header: keyof Contact, index: number) => {
            mappedData[header] = data[index];
        });

        return mappedData as Contact;
    }
}
