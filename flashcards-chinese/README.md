# Web Development Project 1 - *Flashcards for basic Chinese phrases to help beginners*

Submitted by: **Sanjana Chauhan**

This web app: **As someone who is studying Chinses, I thought it would be helpful for myself and other beginners for 10 basic phrases, even for those just visiting for a week. I picked some of the most important words or phrases for getting around China**

Time spent: **2-3** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **The app displays the title of the card set, a short description, and the total number of cards**
  - [x] Title of card set is displayed 
  - [x] A short description of the card set is displayed 
  - [x] A list of card pairs is created
  - [x] The total number of cards in the set is displayed 
  - [x] Card set is represented as a list of card pairs (an array of dictionaries where each dictionary contains the question and answer is perfectly fine)
- [x] **A single card at a time is displayed**
  -x[ ] Only one half of the information pair is displayed at a time
- [x] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  -[x] Clicking on a card flips it over, showing the back with corresponding information 
  -[x] Clicking on a flipped card again flips it back, showing the front
- [x] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [ ] Cards contain images in addition to or in place of text
  - [ ] Some or all cards have images in place of or in addition to text
- [ ] Cards have different visual styles such as color based on their category
  - Example categories you can use:
    - Difficulty: Easy/medium/hard
    - Subject: Biology/Chemistry/Physics/Earth science

The following **additional** features are implemented:

* [x] List anything else that you added to improve the site's functionality! I added a nice image in the background, as well as hover features for the card and the answer side being a different color from the question side so the user can easily differentiate. 

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='src/assets/flashcards-recording.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  Adobe Express

## Notes

Describe any challenges encountered while building the app.

I had a few challenges learning about how to store variables with useState and how to get the card to "flip". I used a lot of the ternary operator since there is usually only two options, like question or answer, flipped or not flipped...