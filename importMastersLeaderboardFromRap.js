function importMastersLeaderboardFromRapidAPI() {
  const url = 'https://live-golf-data.p.rapidapi.com/leaderboard?orgId=1&tournId=014&year=2025';

  const options = {
    method: 'get',
    headers: {
      'x-rapidapi-host': 'live-golf-data.p.rapidapi.com',
      'x-rapidapi-key': '6729af8c2cmshab6c130b2f9e736p1ed68ejsnb92cfc200029'
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  const players = json?.leaderboardRows || [];

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leaderboard');
  sheet.clear();
  sheet.appendRow(['Name', 'Position', 'Total', 'Thru', 'Today', 'Round 1', 'Round 2', 'Round 3', 'Round 4']);

  players.forEach(player => {
    const name = `${player.firstName} ${player.lastName}`;
    const pos = (player.position === '-' ? 'CUT' : player.position) || '';
    const total = player.total || '';
    const thru = player.thru || '';
    const today = player.currentRoundScore || '';
    const rounds = player.rounds || [];
    
    const r1 = rounds[0]?.strokes?.$numberInt || '';
    const r2 = rounds[1]?.strokes?.$numberInt || '';
    const r3 = rounds[2]?.strokes?.$numberInt || '';
    const r4 = rounds[3]?.strokes?.$numberInt || '';

    sheet.appendRow([name, pos, total, thru, today, r1, r2, r3, r4]);
  });
  sortTeamsByRank();
  
  // === Styling starts here ===
  // Freeze header row
  sheet.setFrozenRows(1);

  // Bold headers
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setFontWeight("bold");

  // Remove existing banding first to avoid duplication
  const bandings = sheet.getBandings();
  bandings.forEach(b => b.remove());

  // Apply alternating row colors
  const range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  range.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREEN);

  // Auto resize columns to fit content
  sheet.autoResizeColumns(1, sheet.getLastColumn());
}

function sortTeamsByRank() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Teams');
  const lastRow = sheet.getLastRow();

  sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn())
       .sort({column: 2, ascending: true}); // Column 11 = B = Rank
}

