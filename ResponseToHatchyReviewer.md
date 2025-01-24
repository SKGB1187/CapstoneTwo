**Hatchy Reviewer comment:** On src/app/protected/onebee/page.js: The onebee, twobee, and threebee pages content are pretty much the same. Consider splitting the logic into a shared component and reusing it across the different pages, having the text as a parameter.

**Response:** BeePage.js was added to components. This has the function BeePageComponent. This function has been used on the /onebee, /twobee and /threebee page.js files to replace the repeated code with a reusable component

**Hatchy Reviewer comment:** In src/app/components/WordPracticeCollegiate.js:
```js
> @@ -0,0 +1,90 @@
+"use client";
+
+import React, { useState } from "react";
+import WordCard from "./WordCard";
+import { getRandomWordFromList } from "../utils/getRandomWord";
+import SpellingInput from "./SpellingInput";
+import SummaryCard from "./SummaryCard";
+
+export default function WordPracticeCollegiate({ listName }) {
+  const [wordData, setWordData] = useState(null);
```
Managing five separate state variables makes the component harder to maintain and test. Consider consolidating related states into a single useReducer or useState object.

**Response:** useReducer has been used to combine the 5 separate state variables into one reducer. This has been done for the WordPracticeCollegiate.js and WorDpracticeElementary.js components.

**Hatchy Reviewer comment:** In src/app/components/WordPracticeCollegiate.js:
```js
> +      const randomWord = getRandomWordFromList(listName);
+
+      const response = await fetch(`/api/collegiate?word=${randomWord}`);
+      if (!response.ok) {
+        throw new Error("Failed to fetch word data.");
+      }
+
+      const wordInfo = await response.json();
+
+      setWordData(wordInfo);
+      setTypedWord("");
+      setIsCorrect(null);
+      setIsSpelling(false);
+      setShowSummary(false);
+    } catch (error) {
+      console.error("Error fetching word:", error);
```
Current error handling logs errors to the console but doesn't provide feedback to the user. Implement user-friendly error messages when fetchWord fails.

**Response:**  The fetchword function has been updated to include user friendly errors, these are precipitated into the return function for the code.

**Hatchy Reviewer comment:** In src/app/components/WordPracticeElementary.js:
```js
> +import { getRandomWordFromList } from '../utils/getRandomWord';
+import SpellingInput from './SpellingInput';
+import SummaryCard from './SummaryCard';
+
+export default function WordPracticeElementary({ listName }) {
+  const [wordData, setWordData] = useState(null);
+  const [typedWord, setTypedWord] = useState('');
+  const [isCorrect, setIsCorrect] = useState(null);
+  const [isSpelling, setIsSpelling] = useState(false);
+  const [showSummary, setShowSummary] = useState(false);
+
+  const fetchWord = async () => {
+    try {
+      const randomWord = getRandomWordFromList(listName);
+
+      const response = await fetch(`/api/elementary?word=${randomWord}`);
```
Consider moving API interactions into separate functions or classes, commonly referred to as service layers. This approach not only cleans up your code, making it easier to manage but also enhances the separation of concerns, which is a key principle in software engineering.

**Response:** fetchWordData has been moved to /services/WordService.js

**Hatchy Reviewer comment:** In src/app/api/collegiate/route.js:
```js
> +const API_KEY = process.env.COLLEGIATE_API_KEY;
+const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`;
+
+export async function GET(req) {
+    const { searchParams } = new URL(req.url);
+    const word = searchParams.get("word");
+  
+    if (!word) {
+      return new Response(
+        JSON.stringify({ error: "Word parameter is required." }),
+        { status: 400 }
+      );
+    }
+  
+    try {
+      const response = await axios.get(`${BASE_URL}/${word}?key=${API_KEY}`);
```
Consider moving the API interaction logic into a separate service layer and splitting up repeated logic (e.g. the logic for extracting the example sentence from the API response) into a helper function that can be reused.

**Response:** API logic moved to the service layer for both elementary and collegiate.