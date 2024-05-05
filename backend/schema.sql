CREATE DATABASE typinggame;

USE typinggame;

CREATE TABLE users (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password BINARY(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE texts(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    passage VARCHAR(4000) CHARACTER SET UTF8MB4,
    PRIMARY KEY (id)
);

CREATE TABLE scores(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id INT NOT NULL,
    text_id INT NOT NULL,
    wpm DOUBLE NOT NULL,
    accuracy DOUBLE NOT NULL,
    date_submitted DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    FOREIGN KEY (text_id) REFERENCES texts(id) ON UPDATE CASCADE
);

-- Test passages
INSERT INTO texts (passage) VALUES ("The missile knows where it is at all times. It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is (whichever is greater), it obtains a difference, or deviation.");
INSERT INTO texts (passage) VALUES ("The guidance subsystem uses deviations to generate corrective commands to drive the missile from a position where it is to a position where it isn't, and arriving at a position where it wasn't, it now is. Consequently, the position where it is, is now the position that it wasn't, and it follows that the position that it was, is now the position that it isn't.");
INSERT INTO texts (passage) VALUES ("I don't know what you're talking about. I don't agree with what you're saying. And you're trying to wind me up. But I'm very, very angry, and I want this conversation to stop right away.");
INSERT INTO texts (passage) VALUES ("There is no physical separation after the slicing, so that edge can be ignored and we can treat the pizza, for thermal purposes, as an infinite plane. The procedure reduces the heat-transfer problem to one dimension represented by a vector normal to the pizza surface.");
INSERT INTO texts (passage) VALUES ("By studying the cooling of pizza in the gravity free environment of the space shuttle, we could more exactly determine the importance of convective flows.");
INSERT INTO texts (passage) VALUES ("I'm sorry, what were you asking me? Oh, yes. That stupid plastic container I asked you to buy. You see, hydrofluoric acid won't eat through plastic. It will, however, dissolve metal, rock, glass, ceramic. So there's that.");
INSERT INTO texts (passage) VALUES ("You clearly don't know who you're talking to, so let me clue you in. I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot and you think that of me? No. I am the one who knocks!");
INSERT INTO texts (passage) VALUES ("Lone voyagers in the cosmos are driven by two desires: to tread in the trails of the past, and to forge their own way. But under THEIR scrutiny... most end up adhering to the former.");
INSERT INTO texts (passage) VALUES ("Continuously channeling funds into constructing the space station, improving employee benefits, creating a positive feedback loop... Ahem, as well as satisfying the lead researcher's - that is to say my - indispensable shopping needs.");
INSERT INTO texts (passage) VALUES ("A person is smart. People are dumb, panicky dangerous animals and you know it. Fifteen hundred years ago everybody knew the Earth was the center of the universe. Five hundred years ago, everybody knew the Earth was flat, and fifteen minutes ago, you knew that humans were alone on this planet. Imagine what you'll know tomorrow.");
INSERT INTO texts (passage) VALUES ("Have you thought this through? I mean, chewed down to the bone? You got out once. You dip so much as a pinky back into this pond... you may well find something reaches out... and drags you back into its depths.");
INSERT INTO texts (passage) VALUES ("The feel of embroidery is similar to that of growing a culture in the laboratory - fine control of the wrist, just the right angle, and total commitment.");
INSERT INTO texts (passage) VALUES ("Listen to me, Truman. There's no more truth out there than there is in the world I created for you. The same lies. The same deceit. But in my world, you have nothing to fear. I know you better than you know yourself.");
INSERT INTO texts (passage) VALUES ("Don't be too proud of this technological terror you've constructed. The ability to destroy a planet, or even a whole system, is insignificant next to the power of the Force.");
