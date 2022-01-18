import { useEffect, useState } from 'react';
import {getTeamSchedule, getGameData, getTeams} from './Data.js';

function LastGamePlayedInfo() {
    // Define constants | UseState returns a default value and a setter method. Call the setter method to set the value the constant.
    const [previousGame, setPreviousGame] = useState()
    const [visitingTeamName, setVisitingTeamName] = useState()
    const [homeTeamName, setHomeTeamName] = useState()

    useEffect(() => {
      // Uses season year and team ID to get the teams schedule.
      getTeamSchedule(2021, 1610612749).then(result => {
        // Define variables from the response.
        var lastStandardGamePlayedIndex = result.data.league.lastStandardGamePlayedIndex
        var standardGameSchedule = result.data.league.standard
        var lastGameData = standardGameSchedule[lastStandardGamePlayedIndex]
        // Gets the game data using the variable lastGameData.
        getGameData(lastGameData.startDateEastern, lastGameData.gameId).then(gameResult=> {
          setPreviousGame(gameResult.data) // Sets prevousGame to gameResult.data
          // Gets the teams.
          getTeams(2021).then(result =>{
            var opposingTeamId = ""
            var bucksHome = false
            // If the home team is not the bucks set the opposing team ID and visiting name.
            if (!(gameResult.data.basicGameData.hTeam.teamId === "1610612749")) {
              opposingTeamId = gameResult.data.basicGameData.hTeam.teamId
              bucksHome = (false)
              setVisitingTeamName("Milwaukee Bucks")
            } else { // Else set to opposing team ID to visiting team and the Bucks to home.
              opposingTeamId = gameResult.data.basicGameData.vTeam.teamId
              bucksHome = (true)
              setHomeTeamName("Milwaukee Bucks")
            }
            // Loops through the standard league data until the team ID is located for the opposing team.
            for (const team of result.data.league.standard) {
              if (team.teamId === opposingTeamId) {
                // If the Bucks are the home team then we set the visiting team to the opposing team.
                if (bucksHome === true) {
                setVisitingTeamName(team.fullName) 
                }
                // If the Bucks are the visiting team then we set the home team name to the Bucks.
                else {
                setHomeTeamName(team.fullName)
                }
                break
              }
            }
          })
        })
      });
    }, [])

    var lastArenaName = "N/A"
    var vTeamScore = 0
    var hTeamScore = 0
    var previousGameDate = 0

    // If the previous game is not undefined set the scores to the previous games scores.
    if (!(previousGame === undefined)) {
      // Parse the scores because they are strings by default
        vTeamScore = parseInt(previousGame.stats.vTeam.totals.points)
        hTeamScore = parseInt(previousGame.stats.hTeam.totals.points)
        previousGameDate = new Date(previousGame.basicGameData.startTimeUTC).toDateString()
        lastArenaName = previousGame.basicGameData.arena.name
    }
    
    return (
      <div class="">
        <h1 class="text-center font-family-teko text-5xl lg:text-7xl font-semibold color-bucks-green pb-10 pt-10">LATEST RESULT</h1>
        <div class="flex justify-evenly items-center lg:columns-3 lg:block mx-auto max-w-4xl border-b-black border-b pb-5">
          <div class="">
            <div class="text-center font-family-teko text-2xl lg:text-5xl">{homeTeamName}</div>
            <div class="text-center font-family-rubik lg:text-2xl">{hTeamScore}</div>
          </div>
          <div>
            <div class="text-center font-family-teko text-1xl lg:text-5xl">VS</div>
          </div>
          <div>
            <div class="text-center font-family-teko text-2xl lg:text-5xl">{visitingTeamName}</div>
            <div class="text-center font-family-rubik lg:text-2xl">{vTeamScore}</div>
          </div>
        </div>
        <h1 class="text-center font-family-rubik text-1xl pt-5 font-light"><span class="pr-5">{lastArenaName}</span> | <span class="pl-5">{previousGameDate}</span></h1>
      </div>
    )
  }

  export default LastGamePlayedInfo;