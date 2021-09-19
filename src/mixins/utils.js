import XLSX from 'xlsx'

export const UtilsMixin = {
    methods:{
        exportExcel(excelData, fileName) {
                const data = XLSX.utils.json_to_sheet(excelData)
                const workbook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(workbook, data, fileName)
                XLSX.writeFile(workbook, `${fileName}.csv`)
          },
        getFormatedDate(d) {
            return new Date(d).toLocaleDateString();
        },
    }
}