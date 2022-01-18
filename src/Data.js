import axios from 'axios'

export function getTeamSchedule(seasonYear, teamId) {
    const request = axios.get(`http://data.nba.net/10s/prod/v1/${seasonYear}/teams/${teamId}/schedule.json/`)
  
    request
    .catch(error => console.error('Getting team schedule error:', error))
  
    return request
  }
  
export function getGameData(startDateEastern, gameId) {
    const request = axios.get(`http://data.nba.net/10s/prod/v1/${startDateEastern}/${gameId}_boxscore.json`)
  
    request
    .catch(error => console.error('Getting game data error:', error))
  
    return request
  }
  
export function getTeams(seasonYear) {
    const request = axios.get(`http://data.nba.net/10s/prod/v2/${seasonYear}/teams.json`)
  
    request
    .catch(error => console.error('Getting teams error:', error))
  
    return request
  }
