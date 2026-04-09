<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Masters Pool 2026</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f0;color:#1a1a1a;min-height:100vh}

  .app{max-width:960px;margin:0 auto;padding:16px}

  /* Header */
  .header{background:linear-gradient(135deg,#1a5c2e 0%,#2d8b4e 100%);border-radius:12px;padding:20px 24px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
  .header-left h1{font-size:22px;font-weight:500;color:#fff;letter-spacing:.3px}
  .header-left p{font-size:13px;color:rgba(255,255,255,.75);margin-top:2px}
  .status-dot{width:8px;height:8px;border-radius:50%;background:#4ade80;display:inline-block;margin-right:6px}
  .status-dot.loading{background:#fbbf24;animation:pulse 1s infinite}
  .status-dot.error{background:#f87171}

  /* Tabs */
  .tabs{display:flex;gap:2px;background:#e8e8e0;border-radius:8px;padding:3px;margin-bottom:16px;border:1px solid #d0d0c8}
  .tab{flex:1;padding:8px;font-size:13px;text-align:center;border-radius:6px;cursor:pointer;color:#666;transition:all .15s;border:none;background:transparent}
  .tab.active{background:#fff;color:#1a1a1a;font-weight:500;border:1px solid #d0d0c8}
  .tab:hover:not(.active){color:#1a1a1a}

  /* Standings */
  .standings-grid{display:flex;flex-direction:column;gap:8px}
  .standing-card{background:#fff;border:1px solid #e0e0d8;border-radius:12px;padding:14px 16px;cursor:pointer;transition:border-color .15s}
  .standing-card:hover{border-color:#b0b0a8}
  .standing-card.rank-1{border-left:3px solid #d4a017}
  .standing-card.rank-2{border-left:3px solid #a8a9ad}
  .standing-card.rank-3{border-left:3px solid #c57c3e}
  .sc-header{display:flex;align-items:center;gap:12px}
  .rank-badge{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;flex-shrink:0}
  .rank-1 .rank-badge{background:#fef9c3;color:#854d0e}
  .rank-2 .rank-badge{background:#f1f5f9;color:#475569}
  .rank-3 .rank-badge{background:#fef3e2;color:#92400e}
  .rank-other .rank-badge{background:#f0f0e8;color:#666}
  .sc-name{flex:1;font-size:15px;font-weight:500}
  .sc-score{font-size:20px;font-weight:500;min-width:60px;text-align:right}
  .sc-score.under{color:#15803d}
  .sc-score.even{color:#666}
  .sc-score.over{color:#dc2626}
  .sc-chevron{color:#999;transition:transform .2s;margin-left:8px}
  .sc-chevron.open{transform:rotate(180deg)}
  .sc-details{display:none;margin-top:12px;padding-top:12px;border-top:1px solid #e8e8e0}
  .sc-details.show{display:block}
  .sc-tiebreakers{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
  .tiebreaker-pill{font-size:11px;padding:4px 8px;border-radius:999px;background:#f5f5f0;color:#666;border:1px solid #e0e0d8}
  .golfer-rows{display:flex;flex-direction:column;gap:6px}
  .golfer-row{display:flex;align-items:center;gap:8px;font-size:13px}
  .tier-badge{font-size:11px;padding:2px 7px;border-radius:20px;background:#f0f0e8;color:#666;min-width:48px;text-align:center;flex-shrink:0}
  .golfer-name{flex:1;color:#1a1a1a}
  .golfer-pos{color:#888;min-width:36px;text-align:right;font-size:12px}
  .golfer-score{min-width:52px;text-align:right;font-weight:500}
  .golfer-score.under{color:#15803d}
  .golfer-score.even{color:#666}
  .golfer-score.over{color:#dc2626}
  .golfer-score.cut{color:#aaa}
  .score-multiplier{display:block;font-size:10px;font-weight:500;color:#92400e;line-height:1.1;margin-top:2px}
  .golfer-thru{min-width:40px;text-align:right;font-size:12px;color:#aaa}
  .golfer-row.cut-row{opacity:.5}

  /* Leaderboard */
  .leaderboard-table{background:#fff;border:1px solid #e0e0d8;border-radius:12px;overflow:hidden}
  .lb-head{display:grid;grid-template-columns:44px 1fr 60px 60px 60px;padding:10px 16px;background:#f5f5f0;border-bottom:1px solid #e0e0d8;font-size:12px;color:#888}
  .lb-row{display:grid;grid-template-columns:44px 1fr 60px 60px 60px;padding:10px 16px;border-bottom:1px solid #e8e8e0;align-items:center;font-size:13px}
  .lb-row:last-child{border-bottom:none}
  .lb-row.cut-row{opacity:.45}
  .lb-row.picked{background:#eff6ff}
  .lb-pos{color:#888;font-size:12px}
  .lb-name{font-weight:500}
  .lb-name .picked-by{font-size:11px;font-weight:400;color:#3b82f6;display:block}
  .lb-score{text-align:right;font-weight:500}
  .lb-score.under{color:#15803d}
  .lb-score.even{color:#666}
  .lb-score.over{color:#dc2626}
  .lb-thru{text-align:right;font-size:12px;color:#888}
  .lb-today{text-align:right;font-size:12px;color:#888}
  .cut-divider{padding:8px 16px;background:#f5f5f0;font-size:12px;color:#888;border-bottom:1px solid #e0e0d8}

  /* Tiers */
  .tiers-grid{display:flex;flex-direction:column;gap:10px}
  .tier-card{background:#fff;border:1px solid #e0e0d8;border-radius:12px;overflow:hidden}
  .tier-head{padding:10px 16px;background:#f5f5f0;border-bottom:1px solid #e0e0d8;font-size:13px;font-weight:500}
  .tier-golfers{display:flex;flex-wrap:wrap;gap:6px;padding:12px 16px}
  .tier-golfer{font-size:12px;padding:4px 10px;border-radius:20px;background:#f5f5f0;color:#1a1a1a;border:1px solid #e0e0d8}

  /* Stats */
  .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}
  .stat-card{background:#f0f0e8;border-radius:8px;padding:12px 14px}
  .stat-label{font-size:12px;color:#888;margin-bottom:4px}
  .stat-value{font-size:20px;font-weight:500}

  /* Misc */
  .note-banner{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:13px;color:#92400e;margin-bottom:12px}

  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .spinning{animation:spin .8s linear infinite}

  @media(max-width:600px){
    .stats-row{grid-template-columns:1fr 1fr}
    .lb-head,.lb-row{grid-template-columns:36px 1fr 52px 44px}
    .lb-today,.lb-head div:last-child{display:none}
  }
</style>
</head>
<body>
<div class="app">

  <div class="header">
    <div class="header-left">
      <h1>🏌️ Masters Pool 2026</h1>
      <p><span class="status-dot" id="statusDot"></span><span id="statusText">Loading scores...</span></p>
    </div>
    <div style="display:flex;align-items:center;gap:10px">
      <span id="lastUpdated" style="font-size:12px;color:rgba(255,255,255,.85)">Last updated: --</span>
    </div>
  </div>

  <div class="tabs">
    <button class="tab active" onclick="switchTab('standings',this)">Pool Standings</button>
    <button class="tab" onclick="switchTab('leaderboard',this)">Leaderboard</button>
    <button class="tab" onclick="switchTab('tiers',this)">Tiers & Picks</button>
  </div>

  <div id="tab-standings"></div>
  <div id="tab-leaderboard" style="display:none"></div>
  <div id="tab-tiers" style="display:none"></div>

</div>

<script>
// ================================================================
//  CONFIGURATION — UPDATE THESE BEFORE THE TOURNAMENT
// ================================================================
// Leaderboard is fetched via Apps Script to avoid exposing the API key
// and to benefit from server-side caching. See doGet for details.

// -- TIERS -------------------------------------------------------
// Edit the golfer names in each tier to match the 2026 field.
const TIERS = {
  'Tier 1': ['Scottie Scheffler','Rory McIlroy','Bryson DeChambeau','Ludvig Åberg','Xander Schauffele'],
  'Tier 2': ['Jon Rahm','Collin Morikawa','Justin Thomas','Matt Fitzpatrick','Cameron Young'],
  'Tier 3': ['Jordan Spieth','Viktor Hovland','Tommy Fleetwood','Chris Gotterup','Brooks Koepka'],
  'Tier 4': ['Robert MacIntyre','Patrick Cantlay','Min Woo Lee','Hideki Matsuyama','Shane Lowry'],
  'Tier 5': ['Patrick Reed','Justin Rose','Tyrrell Hatton','Russell Henley','Akshay Bhatia','Max Homa','J.J. Spaun','Dustin Johnson','Keegan Bradley','Cameron Smith'],
  'Tier 6': ['Sepp Straka','Sungjae Im','Si Woo Kim','Kurt Kitayama','Ben Griffin','Brian Harman','Harris English','Brian Campbell','Sam Burns','Wyndham Clark'],
  'Tier 7': ['Jacob Bridgeman','Ryan Fox','Nico Echavarria','Nick Taylor','Corey Conners','Nicolai Højgaard','Rasmus Højgaard','Maverick McNealy','Aldrich Potgieter','Marco Penge','Gary Woodland','Naoyuki Kataoka','Andrew Novak','Jake Knapp','Alex Noren','Daniel Berger','Aaron Rai'],
};

// -- PICKS -------------------------------------------------------
// Loaded live from Google Sheet via Apps Script.
// Falls back to hardcoded values if the sheet can't be reached.


const PICKS_API_URL = 'https://script.google.com/macros/s/AKfycbySIA69mJ3vfL98MJdtEOAlxekd-cDvMNFjT41Ca0uFc_nlFYeOXeQTkTmx7CML_15z/exec';
const CACHE_KEY = 'mastersPool:dataCache';
const CLIENT_REFRESH_INTERVAL_MS = 60000;


let PICKS = {}; // populated on load from Google Sheet

// ================================================================
//  APP CODE 
// ================================================================

let leaderboardData = [];
let picksLoadState = 'waiting';
let isLoadingData = false;

function normName(n){
  if(!n) return '';
  return n.toLowerCase()
    .replace(/å/g,'a').replace(/ø/g,'o').replace(/ó/g,'o')
    .replace(/é/g,'e').replace(/ú/g,'u').replace(/ñ/g,'n')
    .replace(/\./g,'').replace(/\s+/g,' ').trim();
}

function findPlayer(name, data){
  const n = normName(name);
  return data.find(p => normName(p.name) === n) ||
         data.find(p => normName(p.name).includes(n.split(' ').pop())) ||
         null;
}

function fmtScore(s){
  if(s === null || s === undefined) return '-';
  if(s === 0) return 'E';
  return s > 0 ? '+'+s : ''+s;
}

function scoreClass(s, isCut){
  if(isCut) return 'cut';
  if(s === null || s === undefined) return 'even';
  if(s < 0) return 'under';
  if(s === 0) return 'even';
  return 'over';
}

async function loadData(){
  if(isLoadingData) return;
  isLoadingData = true;
  setStatus('loading','Refreshing scores...');

  // Fetch picks and scores in parallel
  try {
    const [nextPicks, nextScores] = await Promise.all([loadPicks(), loadScores()]);
    const picksOk = !!nextPicks;
    const scoresOk = Array.isArray(nextScores) && nextScores.length > 0;

    if(picksOk) PICKS = nextPicks;
    picksLoadState = picksOk ? 'loaded' : (Object.keys(PICKS).length ? 'cached' : 'error');
    if(scoresOk) leaderboardData = nextScores;
    if(!scoresOk && !leaderboardData.length) leaderboardData = getFallbackData();

    if(picksOk || scoresOk){
      writeCache({
        picks: PICKS,
        leaderboardData: scoresOk ? leaderboardData : readCache()?.leaderboardData || [],
        updatedAt: Date.now(),
      });
      setLastUpdatedLabel(Date.now(), false);
    } else {
      const cached = readCache();
      setLastUpdatedLabel(cached?.updatedAt || null, !!cached?.updatedAt);
    }

    if(scoresOk && picksOk){
      setStatus('live','Live · '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}));
    } else if(!scoresOk){
      setStatus('error','Using 2025 demo data — tournament not yet live');
    } else {
      setStatus('error','Could not load picks from Google Sheet');
    }

    renderAll();
  } finally {
    isLoadingData = false;
  }
}

async function loadPicks(){
  try {
    const res = await fetch(PICKS_API_URL);
    if(!res.ok) throw new Error('picks API '+res.status);
    const json = await res.json();
    const rows = json.picks || json;
    if(!Array.isArray(rows) || !rows.length) throw new Error('empty');

    const picks = {};
    rows.forEach(row => {
      const name = (row.name || row['Full Name'] || '').trim();
      if(!name) return;
      // Prefer write-in for Tier 7, fall back to dropdown
      const tier7 = (row.tier7WriteIn || row['If you chose another golfer for tier 7'] || '').trim()
                 || (row.tier7 || row['Tier #7'] || '').trim();
      picks[name] = {
        'Tier 1': (row.tier1 || row['Tier #1'] || '').trim(),
        'Tier 2': (row.tier2 || row['Tier #2'] || '').trim(),
        'Tier 3': (row.tier3 || row['Tier #3'] || '').trim(),
        'Tier 4': (row.tier4 || row['Tier #4'] || '').trim(),
        'Tier 5': (row.tier5 || row['Tier #5'] || '').trim(),
        'Tier 6': (row.tier6 || row['Tier #6'] || '').trim(),
        'Tier 7': tier7,
        tiebreaker1: (row.tiebreaker1 || row['Tie Breaker #1'] || '').trim(),
        tiebreaker2: (row.tiebreaker2 || row['Tie Breaker #2'] || '').trim(),
      };
    });
    return picks;
  } catch(e) {
    console.warn('Picks load failed:', e);
    return null;
  }
}

async function loadScores(){
  try {
    const res = await fetch(PICKS_API_URL + '?action=leaderboard');
    if(!res.ok) throw new Error('API '+res.status);
    const json = await res.json();
    const parsed = parseLeaderboard(json);
    if(!parsed.length) throw new Error('empty');
    return parsed;
  } catch(e){
    return null;
  }
}

function readCache(){
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if(!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch(e){
    console.warn('Cache read failed:', e);
    return null;
  }
}

function writeCache(data){
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch(e){
    console.warn('Cache write failed:', e);
  }
}

function setLastUpdatedLabel(timestamp, isCached){
  const el = document.getElementById('lastUpdated');
  if(!timestamp){
    el.textContent = 'Last updated: waiting for shared data';
    return;
  }
  const label = new Date(timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  el.textContent = 'Last updated: ' + label + (isCached ? ' (cached)' : '');
}

function initializeFromCache(){
  const cached = readCache();
  const cachedPicks = cached?.picks && typeof cached.picks === 'object' ? cached.picks : null;
  const cachedScores = Array.isArray(cached?.leaderboardData) ? cached.leaderboardData : null;
  const hasCachedPicks = !!cachedPicks && Object.keys(cachedPicks).length > 0;
  const hasCachedScores = !!cachedScores && cachedScores.length > 0;

  PICKS = hasCachedPicks ? cachedPicks : {};
  picksLoadState = hasCachedPicks ? 'cached' : 'waiting';
  leaderboardData = hasCachedScores ? cachedScores : getFallbackData();

  setLastUpdatedLabel(cached?.updatedAt || null, true);

  if(hasCachedPicks && hasCachedScores){
    setStatus('live','Cached · checking shared data');
  } else if(hasCachedScores){
    setStatus('error','Scores cached · picks unavailable');
  } else if(hasCachedPicks){
    setStatus('error','Picks cached · using fallback scores');
  } else {
    setStatus('loading','No cached data yet · loading shared data');
  }

  renderAll();
}

function parseLeaderboard(json){
  const rows = json?.leaderboard || json?.leaderboardRows || json?.players || json?.results || json || [];
  if(!Array.isArray(rows)) return [];
  return rows.map(p => {
    const totalRaw = p.total ?? p.totalScore ?? p.score ?? null;
    const todayRaw = p.currentRoundScore ?? p.today ?? p.currentRound ?? null;
    const firstName = p.firstName || '';
    const lastName = p.lastName || '';
    const name = (firstName + ' ' + lastName).trim() || p.playerName || p.name || p.player || '';
    return {
      name: name,
      pos:  p.position || p.pos || '-',
      total: parseScoreStr(totalRaw),
      today: parseScoreStr(todayRaw),
      thru:  p.thru || p.holesPlayed || 'F',
      cut: (String(p.position||p.pos||'')).toUpperCase().includes('CUT') ||
           (String(p.status||'')).toUpperCase().includes('CUT'),
    };
  }).filter(p => p.name);
}

function parseScoreStr(v){
  if(v === null || v === undefined || v === '') return null;
  const s = String(v).trim().toUpperCase();
  if(s === 'E') return 0;
  const n = parseInt(s.replace('+',''));
  return isNaN(n) ? null : n;
}

function setStatus(state, msg){
  const dot = document.getElementById('statusDot');
  dot.className = 'status-dot'+(state==='loading'?' loading':state==='error'?' error':'');
  document.getElementById('statusText').textContent = msg;
}

function parseTiebreakerValue(value){
  if(value === null || value === undefined || value === '') return null;
  const parsed = parseInt(String(value).trim(), 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function compareTiebreakers(a, b){
  if(a === null && b === null) return 0;
  if(a === null) return 1;
  if(b === null) return -1;
  return a - b;
}

function parsePositionRank(pos){
  if(pos === null || pos === undefined) return null;
  const s = String(pos).trim().toUpperCase();
  if(!s || s.includes('CUT') || s === '-') return null;
  const numeric = parseInt(s.replace(/^T/, ''), 10);
  return Number.isNaN(numeric) ? null : numeric;
}

function calcStandings(){
  const tierKeys = Object.keys(TIERS);
  return Object.entries(PICKS).map(([player, picks]) => {
    let total = 0, count = 0, bonusPoints = 0;
    const tiebreaker1 = parseTiebreakerValue(picks.tiebreaker1);
    const tiebreaker2 = parseTiebreakerValue(picks.tiebreaker2);
    const details = tierKeys.map(tier => {
      const golferName = picks[tier] || '';
      const found = findPlayer(golferName, leaderboardData);
      let score = null, scoringScore = null, pos = '-', thru = '-', isCut = false;
      if(found){ score = found.total; pos = found.pos; thru = found.thru; isCut = found.cut; }
      if(score !== null){
        scoringScore = isCut ? score * 2 : score;
        total += scoringScore;
        count++;
      }
      if(found){
        const rank = parsePositionRank(pos);
        if(rank === 1) bonusPoints += 5;
        if(rank !== null && rank <= 5) bonusPoints += 3;
        if(rank !== null && rank <= 10) bonusPoints += 1;
      }
      return { tier, golferName, score, scoringScore, pos, thru, isCut, found: !!found };
    });
    return {
      player,
      totalScore: count > 0 ? total - bonusPoints : null,
      bonusPoints,
      tiebreaker1,
      tiebreaker2,
      details
    };
  }).sort((a,b) => {
    if(a.totalScore === null) return 1;
    if(b.totalScore === null) return -1;
    const scoreDiff = a.totalScore - b.totalScore;
    if(scoreDiff !== 0) return scoreDiff;
    const tiebreaker1Diff = compareTiebreakers(a.tiebreaker1, b.tiebreaker1);
    if(tiebreaker1Diff !== 0) return tiebreaker1Diff;
    return compareTiebreakers(a.tiebreaker2, b.tiebreaker2);
  });
}

function renderStandings(){
  const standings = calcStandings();
  const rankNames = ['','rank-1','rank-2','rank-3'];
  const leader = standings[0];
  let html = '';

  // Warn if picks couldn't be loaded from sheet
  if(picksLoadState === 'error'){
    html += `<div class="note-banner">⚠️ Could not load picks from Google Sheet — check the Apps Script URL and refresh.</div>`;
  }
  html += `<div class="note-banner">Scoring bonus: pick the outright winner for an extra -5, each top-5 finisher for an extra -3, and each top-10 finisher for an extra -1. Bonuses stack and are subtracted from your total score.</div>`;

  html += '<div class="stats-row">';
  html += `<div class="stat-card"><div class="stat-label">Leader</div><div class="stat-value">${leader?.player||'-'}</div></div>`;
  const ls = leader?.totalScore;
  html += `<div class="stat-card"><div class="stat-label">Leading score</div><div class="stat-value" style="color:${ls<0?'#15803d':ls>0?'#dc2626':'inherit'}">${ls!==null?fmtScore(ls):'-'}</div></div>`;
  html += `<div class="stat-card"><div class="stat-label">Players in pool</div><div class="stat-value">${standings.length}</div></div>`;
  html += '</div>';

  html += '<div class="standings-grid">';
  standings.forEach((s, i) => {
    const rank = i+1;
    const rc = rank <= 3 ? rankNames[rank] : 'rank-other';
    const sc = s.totalScore !== null ? scoreClass(s.totalScore, false) : 'even';
    html += `<div class="standing-card ${rc}" onclick="toggleCard('card-${i}',this)">
      <div class="sc-header">
        <div class="rank-badge">${rank}</div>
        <div class="sc-name">${s.player}</div>
        <div class="sc-score ${sc}">${s.totalScore!==null?fmtScore(s.totalScore):'-'}</div>
        <svg class="sc-chevron" id="chev-card-${i}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="sc-details" id="card-${i}">
        <div class="sc-tiebreakers">
          <span class="tiebreaker-pill">Placement bonus: ${s.bonusPoints ? '-'+s.bonusPoints : '0'}</span>
          <span class="tiebreaker-pill">Tiebreaker 1: ${s.tiebreaker1 ?? '-'}</span>
          <span class="tiebreaker-pill">Tiebreaker 2: ${s.tiebreaker2 ?? '-'}</span>
        </div>
        <div class="golfer-rows">`;
    s.details.forEach(g => {
      const gs = g.scoringScore !== null ? fmtScore(g.scoringScore) : (g.found ? '-' : '-');
      const gc = g.found ? scoreClass(g.scoringScore, g.isCut) : 'even';
      const multiplier = g.isCut && g.score !== null ? `<span class="score-multiplier">x2 from ${fmtScore(g.score)}</span>` : '';
      html += `<div class="golfer-row${g.isCut?' cut-row':''}">
        <span class="tier-badge">${g.tier}</span>
        <span class="golfer-name">${g.golferName}</span>
        <span class="golfer-pos">${g.pos}</span>
        <span class="golfer-score ${gc}">${gs}${multiplier}</span>
        <span class="golfer-thru">${g.thru}</span>
      </div>`;
    });
    html += `</div></div></div>`;
  });
  html += '</div>';
  document.getElementById('tab-standings').innerHTML = html;
}

function toggleCard(id, card){
  const d = document.getElementById(id);
  const c = document.getElementById('chev-'+id);
  const open = d.classList.contains('show');
  d.classList.toggle('show',!open);
  c.classList.toggle('open',!open);
}

function renderLeaderboard(){
  const pickedBy = {};
  Object.entries(PICKS).forEach(([player, picks]) => {
  Object.values(picks).forEach(g => {
    const key = normName(g);
    if (pickedBy[key]) {
      pickedBy[key] = pickedBy[key] + ', ' + player;
    } else {
      pickedBy[key] = player;
    }
  });
});
  const active = leaderboardData.filter(p => !p.cut);
  const cut    = leaderboardData.filter(p =>  p.cut);

  let html = `<div class="leaderboard-table">
    <div class="lb-head">
      <div>Pos</div><div>Player</div><div style="text-align:right">Total</div><div style="text-align:right">Thru</div><div style="text-align:right">Today</div>
    </div>`;

  active.forEach(p => {
    const pb = pickedBy[normName(p.name)];
    const sc = scoreClass(p.total, false);
    html += `<div class="lb-row${pb?' picked':''}">
      <div class="lb-pos">${p.pos}</div>
      <div class="lb-name">${p.name}${pb?`<span class="picked-by">${pb}</span>`:''}</div>
      <div class="lb-score ${sc}">${fmtScore(p.total)}</div>
      <div class="lb-thru">${p.thru||'F'}</div>
      <div class="lb-today">${fmtScore(p.today)}</div>
    </div>`;
  });

  if(cut.length){
    html += `<div class="cut-divider">— Cut —</div>`;
    cut.forEach(p => {
      const pb = pickedBy[normName(p.name)];
      html += `<div class="lb-row cut-row${pb?' picked':''}">
        <div class="lb-pos">CUT</div>
        <div class="lb-name">${p.name}${pb?`<span class="picked-by">${pb}</span>`:''}</div>
        <div class="lb-score cut">${fmtScore(p.total)}</div>
        <div class="lb-thru">-</div>
        <div class="lb-today">-</div>
      </div>`;
    });
  }
  html += '</div>';
  document.getElementById('tab-leaderboard').innerHTML = html;
}

function renderTiers(){
  const tierKeys = Object.keys(TIERS);
  let html = '<div class="tiers-grid">';

  // Picks table
  html += `<div class="tier-card"><div class="tier-head">All picks (${Object.keys(PICKS).length} entries)</div><div style="overflow-x:auto">
    <table style="width:100%;font-size:12px;border-collapse:collapse">
    <tr style="background:#f5f5f0">
      <td style="padding:8px 14px;font-weight:500;white-space:nowrap">Player</td>`;
  tierKeys.forEach(t => html += `<td style="padding:8px 10px;font-weight:500;white-space:nowrap">${t}</td>`);
  html += '</tr>';
  Object.entries(PICKS).forEach(([player, picks]) => {
    html += `<tr style="border-top:1px solid #e8e8e0"><td style="padding:7px 14px;font-weight:500;white-space:nowrap">${player}</td>`;
    tierKeys.forEach(t => {
      const g = picks[t] || '-';
      const found = findPlayer(g, leaderboardData);
      const score = found ? fmtScore(found.total) : '';
      const cut = found?.cut;
      html += `<td style="padding:7px 10px;white-space:nowrap;font-size:11px;${cut?'opacity:.5':''}${found&&found.total<0?'color:#15803d;font-weight:500':''}">${g}${score?' <span style="color:#aaa">('+score+')</span>':''}</td>`;
    });
    html += '</tr>';
  });
  html += '</table></div></div>';

  // Per-tier golfer pills with live scores
  Object.entries(TIERS).forEach(([tier, golfers]) => {
    html += `<div class="tier-card"><div class="tier-head">${tier}</div><div class="tier-golfers">`;
    golfers.forEach(g => {
      const found = findPlayer(g, leaderboardData);
      const score = found ? ' · '+fmtScore(found.total) : '';
      const cut = found?.cut;
      const hot = found && found.total <= -5;
      html += `<span class="tier-golfer" style="${cut?'opacity:.45':''}${hot?';border-color:#15803d;color:#15803d':''}">${g}${score}</span>`;
    });
    html += '</div></div>';
  });
  html += '</div>';
  document.getElementById('tab-tiers').innerHTML = html;
}

function renderAll(){ renderStandings(); renderLeaderboard(); renderTiers(); }

function switchTab(tab, btn){
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  ['standings','leaderboard','tiers'].forEach(t => {
    document.getElementById('tab-'+t).style.display = t===tab?'':'none';
  });
}

// -- FALLBACK DATA (2025 Masters results for testing) ------------
function getFallbackData(){
  return [
    {name:'Rory McIlroy',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Justin Rose',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Patrick Reed',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Scottie Scheffler',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Sungjae Im',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Bryson DeChambeau',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Ludvig Åberg',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Xander Schauffele',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Corey Conners',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Harris English',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Max Homa',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Jon Rahm',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Jordan Spieth',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Tyrrell Hatton',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Collin Morikawa',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Hideki Matsuyama',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Tommy Fleetwood',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Daniel Berger',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Viktor Hovland',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Aaron Rai',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Matt Fitzpatrick',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Maverick McNealy',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Rasmus Højgaard',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Justin Thomas',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Brian Harman',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Patrick Cantlay',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Akshay Bhatia',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Shane Lowry',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Wyndham Clark',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Sam Burns',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Min Woo Lee',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'J.J. Spaun',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Dustin Johnson',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Russell Henley',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Brooks Koepka',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Cameron Smith',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Cameron Young',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Robert MacIntyre',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Keegan Bradley',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Nico Echavarria',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Nicolai Højgaard',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Chris Gotterup',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Si Woo Kim',pos:'-',total:null,today:null,thru:'-',cut:false},
    {name:'Brian Harman',pos:'-',total:null,today:-1,thru:'-',cut:false},
    {name:'Brian Campbell',pos:'-',total:null,today:-4,thru:'-',cut:false},
    {name:'Ben Griffin',pos:'-',total:null,today:null,thru:'-',cut:false},
  ];
}

// -- INIT --------------------------------------------------------
initializeFromCache();
loadData();
setInterval(loadData, CLIENT_REFRESH_INTERVAL_MS);
</script>
</body>
</html>
