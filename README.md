# Asst5_Calendar
Create a daily diary

url:https://jo3005.github.io/Asst5_Calendar/.
github repository: https://github.com/jo3005/Asst5_Calendar/

## Description:
This website displays a daily planner for the current day.
The user can add or change any of the contents of the planner, but the data will only be saved when the button for that timeslot is pressed.
The data is saved in local storage along with the date of the diary and the starting time.

Hourly timeslots that have passed are colored in gray, the current timeslot is red whilst future timeslots are coloured green.

Although the starting time is not currently user changeable, the system has been designed so that this can be added in the future.  Similarly, the diary can not currently scroll through past or future days, however this can be added in the future.


## Original User criteria:

GIVEN I am using a daily planner to create a schedule,
WHEN I open the planner,
THEN the current day is displayed at the top of the calendar,
WHEN I scroll down,
THEN I am presented with timeblocks for standard business hours,
WHEN I view the timeblocks for that day,
THEN each timeblock is color coded to indicate whether it is in the past, present, or future,
WHEN I click into a timeblock,
THEN I can enter an event,
WHEN I click the save button for that timeblock,
THEN the text for that event is saved in local storage,
WHEN I refresh the page,
THEN the saved events persist.
