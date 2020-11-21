interface Vote {
  id: number,
  category: number,
  d_id: number,
  name: string,
  num: number
}

function main(): void {
  const res = UrlFetchApp.fetch('https://kc-i.jp/activity/award/isca/2020/db/db_get.php')
  const votes = JSON.parse(res.getContentText()) as Vote[]

  votes.sort((a, b) => a.id - b.id)

  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('spreadsheetId')
  const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet()

  sheet.appendRow([
    new Date().toISOString(),
    ...votes.map(v => v.num)
  ])
}
