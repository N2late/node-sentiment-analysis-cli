# node-sentiment-analysis-cli

A Node.js sentiment analysis program that uses an API to analyze text that you pass in on the command line (either as an additional argument or reading from a file) and print out the "mood" of the text, including:

- whether it is positive, negative or neutral
- what percentage of each the text is

### Examples

Accepting text from the command line:

```
$ node index.js awesome
Your text has the following sentiment:

-positive with 65.45% of probability

```

Or, reading from a file,:

```
$ node index.js myText.txt
Your text has the following sentiment:

-negative with 65.55% probability.
```
