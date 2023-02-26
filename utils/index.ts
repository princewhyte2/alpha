export const validateEmail = (email:string) => {
  return email
    .toLowerCase()
    .match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
}

export const stripHtml= (html:string) =>  {
    return html.replace(/<\s*[^>]*>/gi, '');
}

export const hobbiesList = ['reading', 'writing', 'running', 'gardening', 'cooking', 'traveling', 'dancing', 'painting', 'photography', 'hiking', 'biking', 'swimming', 'yoga', 'meditation', 'gym', 'tennis', 'badminton', 'basketball', 'football', 'baseball', 'golf', 'surfing', 'snowboarding', 'skiing', 'ice skating', 'rock climbing', 'kayaking', 'canoeing', 'sailing', 'fishing', 'hunting', 'camping', 'birdwatching', 'stargazing', 'astronomy', 'garden', 'chess', 'poker', 'bridge', 'scrabble', 'sudoku', 'crossword puzzles', 'jigsaw puzzles', 'knitting', 'crocheting', 'sewing', 'quilting', 'woodworking', 'carving', 'sculpting', 'origami', 'calligraphy', 'papercraft', 'drawing', 'sketching', 'cartooning', 'manga', 'anime', 'cosplay', 'comic books', 'graphic novels', 'board games', 'card games', 'role-playing games', 'video games', 'online games', 'arcade games', 'virtual reality', 'augmented reality', 'drumming', 'guitar', 'piano', 'violin', 'cello', 'flute', 'clarinet', 'saxophone', 'trumpet', 'trombone', 'percussion', 'singing', 'rapping', 'djing', 'producing', 'composing', 'songwriting', 'poetry', 'short stories', 'novels', 'screenplays', 'plays', 'stand-up comedy', 'improv', 'theater', 'drama', 'ballet', 'modern dance', 'tap dance', 'jazz dance', 'hip hop dance', 'folk dance', 'belly dance', 'salsa', 'tango', 'swing dance', 'line dancing', 'square dancing', 'ballroom dancing'];