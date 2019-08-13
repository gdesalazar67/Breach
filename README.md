# Ncaa Wrestling Championships

## Background and Overview:<br>
  Is an interactive results bracket of the 2019 Ncaa wrestling championships. By clicking on certain parts of the circular bracket you see the different paths wrestlers took to their final placing in the tornament. You can see results per round, per wrestler, per team, per weight class.  Team colors are incoprarated into the brackets so at a glance you can see which teams has the most wrestlers in the tournament in any given round.  All data comes from http://api.centermatwrestling.com/
  
## Functionality and MVP Features: <br>
  ### Basic graph:<br>
    Will show over all completed bracket per wieght class with winner in center.<br>
    ability to switch between weight classes.<br>
    ability to zoom focus in on rounds: maybe thru a modal<br>
  ### Intermidiate goals:<br>
    be able to select a wrestler and zoom focus on his path in the tournament.<br>
    select on specific matches and show results of match and wrestler stats.<br>
    show team results of top three teams in the tournament per round on the side.<br>
  ### Challange goals:<br>
    incorporate profile photos of wrestler, regular season record, and info on match up<br>

## Architecture and Technologies:<br>
 ### Technologies employed:<br>
 Vanilla JavaScript<br>
  [D3 circle match tree](https://charts.animateddata.co.uk/tennis/matchTree.html)<br>
  Webpack to bundle various scripts into a single source.<br>
  React.js for basic page structure and functionality.<br>
  
### Architecture:<br>
bracket.js main page, holds all the state info.<br>
match_tree.jsx responsible for rendering circle tree.<br>
weight_class.jsx contains weight class drop down menu.<br>
team_standing.jsx handles team scores render.<br>
scorebaord.jsx shows match score <br>

## Development timeline:
### day one:
build structure and be able to retrive data from api<br>
### day two:
half day to continue day one if not yet completed<br>
start circletree<br>
### day three:
continue on circletree<br>
start weightclass dropdown<br>
### day four:
half day to continue dropdown<br>
start on scoreboard<br>
### day five:
half day to continue scoreboard<br>
work on making round or wreslter path pop out <br>

##Wireframe
![wireframe ](https://user-images.githubusercontent.com/48927999/62913699-2a3fab00-bd5b-11e9-8bdf-af6943d71fb5.png)


 
