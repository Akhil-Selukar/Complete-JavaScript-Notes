## 42 Date and time internationalization

Javascript probvides internationalization (Intl) API to format the date and time based on different countries and language standards.
The date and time printed by below code is in the default format which javascript uses to represent date and time.

```javascript
const now = new Date();
console.log(now);
```

Output:

```
Sun Mar 17 2024 12:32:53 GMT+0530 (India Standard Time)
```

Now, if we want to format this date and time to US (i.e. United States) and GB (i.e. United Kingdom) format then we can use internationalization API as below.

```javascript
const now = new Date();

const dateFormat_US = new Intl.DateTimeFormat("en-US").format(now);
console.log(dateFormat_US);

const dateFormat_GB = new Intl.DateTimeFormat("en-GB").format(now);
console.log(dateFormat_GB);
```

In above case we are using date time format of internationalization API and we are passing the language code and then asking to format the date stored in 'now' variable. Here 'en-US' means the english language in United States format while 'en-GB' means the english language in United Kingdom format. Now if we see the output of above code then the date will be formatted in therespective format.

```
3/17/2024
17/03/2024
```

Here we can see that the first output is 3/17/2024 i.e. month is first then date and then year, while the second output is `17/03/2024 i.e. date first, then month and then year. Here there is one problem, we can't see the time in this case. SO to fix this we can pass another argument to the Intl.DateTimeFormat() which is the formatOption. In formatOption object we can specify the format in which we want the date and time to be formatted also we can specify what values we want and what values we dont want. have a look at below example.

```javascript
"use strict";

const now = new Date();

const formatOption = {
  day: "numeric",
  month: "short",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
  weekday: "long",
};

const dateFormat_US = new Intl.DateTimeFormat("en-US", formatOption).format(
  now
);
console.log(dateFormat_US);

const dateFormat_GB = new Intl.DateTimeFormat("en-GB", formatOption).format(
  now
);
console.log(dateFormat_GB);
```

Here in above code we have created an object 'formatOption' where we have specified what all values we need and in which format we need those values to be formatted. We then passed this object to the Intl.DateTimeFormat() API and now if we see the result.

```
Sunday, Mar 17, 24, 12:54 PM
Sunday, 17 Mar 24, 12:54
```

In above result we can see that we got completly different and customized format of date and time. In formatOption we have specified day as numeric hence we got 17 as date, then we have specified month as short hence we got 'Mar' which is short form of 'March' similarly we got 'Sunday' as weekday in log format and so on. using this second argumrnt to the Intl.DateTimeFormat() we can customize the format of date and time. Now still there is one problem remainint. In above code we are manually setting the language code. Hence changing this code every time user logs in from different location is not possible. It should take the system's or browsers language code and work as per that. This can be achieved as below.

```javascript
const now = new Date();

const formatOption = {
  day: "numeric",
  month: "short",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
  weekday: "long",
};

const languageCode = navigator.language;
console.log(languageCode);

const dateFormat = new Intl.DateTimeFormat(languageCode, formatOption).format(
  now
);
console.log(dateFormat);
```

Here we are reading the language code from navigator. This gives us the language code set in browser and we can use the same in the code. So if the user is based out of UK then the language code set in his/her system's browser will be 'en-GB' while if the user is from US then the language code in his/her system will be 'en-US' so we can use this way to dynamically assign the language code.

In above example the language code in my system's browser is 'en-US' and thence the date got formatted in 'US' format and I got below output.

```
en-US
Sunday, Mar 17, 24, 1:03 PM
```

Note: Refer [MDN-Documentation-internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for more details. Below is the lost of different language code ([source](http://www.lingoes.net/en/translator/langcode.htm)).

| Code   | Name                                                    |
| ------ | ------------------------------------------------------- |
| af     | Afrikaans                                               |
| af-ZA  | Afrikaans (South Africa)                                |
| ar     | Arabic                                                  |
| ar-AE  | Arabic (U.A.E.)                                         |
| ar-BH  | Arabic (Bahrain)                                        |
| ar-DZ  | Arabic (Algeria)                                        |
| ar-EG  | Arabic (Egypt)                                          |
| ar-IQ  | Arabic (Iraq)                                           |
| ar-JO  | Arabic (Jordan)                                         |
| ar-KW  | Arabic (Kuwait)                                         |
| ar-LB  | Arabic (Lebanon)                                        |
| ar-LY  | Arabic (Libya)                                          |
| ar-MA  | Arabic (Morocco)                                        |
| ar-OM  | Arabic (Oman)                                           |
| ar-QA  | Arabic (Qatar)                                          |
| ar-SA  | Arabic (Saudi Arabia)                                   |
| ar-SY  | Arabic (Syria)                                          |
| ar-TN  | Arabic (Tunisia)                                        |
| ar-YE  | Arabic (Yemen)                                          |
| az     | Azeri (Latin)                                           |
| az-AZ  | Azeri (Latin) (Azerbaijan)                              |
| az-AZ  | Azeri (Cyrillic) (Azerbaijan)                           |
| be     | Belarusian                                              |
| be-BY  | Belarusian (Belarus)                                    |
| bg     | Bulgarian                                               |
| bg-BG  | Bulgarian (Bulgaria)                                    |
| bs-BA  | Bosnian (Bosnia and Herzegovina)                        |
| ca     | Catalan                                                 |
| ca-ES  | Catalan (Spain)                                         |
| cs     | Czech                                                   |
| cs-CZ  | Czech (Czech Republic)                                  |
| cy     | Welsh                                                   |
| cy-GB  | Welsh (United Kingdom)                                  |
| da     | Danish                                                  |
| da-DK  | Danish (Denmark)                                        |
| de     | German                                                  |
| de-AT  | German (Austria)                                        |
| de-CH  | German (Switzerland)                                    |
| de-DE  | German (Germany)                                        |
| de-LI  | German (Liechtenstein)                                  |
| de-LU  | German (Luxembourg)                                     |
| dv     | Divehi                                                  |
| dv-MV  | Divehi (Maldives)                                       |
| el     | Greek                                                   |
| el-GR  | Greek (Greece)                                          |
| en     | English                                                 |
| en-AU  | English (Australia)                                     |
| en-BZ  | English (Belize)                                        |
| en-CA  | English (Canada)                                        |
| en-CB  | English (Caribbean)                                     |
| en-GB  | English (United Kingdom)                                |
| en-IE  | English (Ireland)                                       |
| en-JM  | English (Jamaica)                                       |
| en-NZ  | English (New Zealand)                                   |
| en-PH  | English (Republic of the Philippines)                   |
| en-TT  | English (Trinidad and Tobago)                           |
| en-US  | English (United States)                                 |
| en-ZA  | English (South Africa)                                  |
| en-ZW  | English (Zimbabwe)                                      |
| eo     | Esperanto                                               |
| es     | Spanish                                                 |
| es-AR  | Spanish (Argentina)                                     |
| es-BO  | Spanish (Bolivia)                                       |
| es-CL  | Spanish (Chile)                                         |
| es-CO  | Spanish (Colombia)                                      |
| es-CR  | Spanish (Costa Rica)                                    |
| es-DO  | Spanish (Dominican Republic)                            |
| es-EC  | Spanish (Ecuador)                                       |
| es-ES  | Spanish (Castilian)                                     |
| es-ES  | Spanish (Spain)                                         |
| es-GT  | Spanish (Guatemala)                                     |
| es-HN  | Spanish (Honduras)                                      |
| es-MX  | Spanish (Mexico)                                        |
| es-NI  | Spanish (Nicaragua)                                     |
| es-PA  | Spanish (Panama)                                        |
| es-PE  | Spanish (Peru)                                          |
| es-PR  | Spanish (Puerto Rico)                                   |
| es-PY  | Spanish (Paraguay)                                      |
| es-SV  | Spanish (El Salvador)                                   |
| es-UY  | Spanish (Uruguay)                                       |
| es-VE  | Spanish (Venezuela)                                     |
| et     | Estonian                                                |
| et-EE  | Estonian (Estonia)                                      |
| eu     | Basque                                                  |
| eu-ES  | Basque (Spain)                                          |
| fa     | Farsi                                                   |
| fa-IR  | Farsi (Iran)                                            |
| fi     | Finnish                                                 |
| fi-FI  | Finnish (Finland)                                       |
| fo     | Faroese                                                 |
| fo-FO  | Faroese (Faroe Islands)                                 |
| fr     | French                                                  |
| fr-BE  | French (Belgium)                                        |
| fr-CA  | French (Canada)                                         |
| fr-CH  | French (Switzerland)                                    |
| fr-FR  | French (France)                                         |
| fr-LU  | French (Luxembourg)                                     |
| fr-MC  | French (Principality of Monaco)                         |
| gl     | Galician                                                |
| gl-ES  | Galician (Spain)                                        |
| gu     | Gujarati                                                |
| gu-IN  | Gujarati (India)                                        |
| he     | Hebrew                                                  |
| he-IL  | Hebrew (Israel)                                         |
| hi     | Hindi                                                   |
| hi-IN  | Hindi (India)                                           |
| hr     | Croatian                                                |
| hr-BA  | Croatian (Bosnia and Herzegovina)                       |
| hr-HR  | Croatian (Croatia)                                      |
| hu     | Hungarian                                               |
| hu-HU  | Hungarian (Hungary)                                     |
| hy     | Armenian                                                |
| hy-AM  | Armenian (Armenia)                                      |
| id     | Indonesian                                              |
| id-ID  | Indonesian (Indonesia)                                  |
| is     | Icelandic                                               |
| is-IS  | Icelandic (Iceland)                                     |
| it     | Italian                                                 |
| it-CH  | Italian (Switzerland)                                   |
| it-IT  | Italian (Italy)                                         |
| ja     | Japanese                                                |
| ja-JP  | Japanese (Japan)                                        |
| ka     | Georgian                                                |
| ka-GE  | Georgian (Georgia)                                      |
| kk     | Kazakh                                                  |
| kk-KZ  | Kazakh (Kazakhstan)                                     |
| kn     | Kannada                                                 |
| kn-IN  | Kannada (India)                                         |
| ko     | Korean                                                  |
| ko-KR  | Korean (Korea)                                          |
| kok    | Konkani                                                 |
| kok-IN | Konkani (India)                                         |
| ky     | Kyrgyz                                                  |
| ky-KG  | Kyrgyz (Kyrgyzstan)                                     |
| lt     | Lithuanian                                              |
| lt-LT  | Lithuanian (Lithuania)                                  |
| lv     | Latvian                                                 |
| lv-LV  | Latvian (Latvia)                                        |
| mi     | Maori                                                   |
| mi-NZ  | Maori (New Zealand)                                     |
| mk     | FYRO Macedonian                                         |
| mk-MK  | FYRO Macedonian (Former Yugoslav Republic of Macedonia) |
| mn     | Mongolian                                               |
| mn-MN  | Mongolian (Mongolia)                                    |
| mr     | Marathi                                                 |
| mr-IN  | Marathi (India)                                         |
| ms     | Malay                                                   |
| ms-BN  | Malay (Brunei Darussalam)                               |
| ms-MY  | Malay (Malaysia)                                        |
| mt     | Maltese                                                 |
| mt-MT  | Maltese (Malta)                                         |
| nb     | Norwegian (Bokm?l)                                      |
| nb-NO  | Norwegian (Bokm?l) (Norway)                             |
| nl     | Dutch                                                   |
| nl-BE  | Dutch (Belgium)                                         |
| nl-NL  | Dutch (Netherlands)                                     |
| nn-NO  | Norwegian (Nynorsk) (Norway)                            |
| ns     | Northern Sotho                                          |
| ns-ZA  | Northern Sotho (South Africa)                           |
| pa     | Punjabi                                                 |
| pa-IN  | Punjabi (India)                                         |
| pl     | Polish                                                  |
| pl-PL  | Polish (Poland)                                         |
| ps     | Pashto                                                  |
| ps-AR  | Pashto (Afghanistan)                                    |
| pt     | Portuguese                                              |
| pt-BR  | Portuguese (Brazil)                                     |
| pt-PT  | Portuguese (Portugal)                                   |
| qu     | Quechua                                                 |
| qu-BO  | Quechua (Bolivia)                                       |
| qu-EC  | Quechua (Ecuador)                                       |
| qu-PE  | Quechua (Peru)                                          |
| ro     | Romanian                                                |
| ro-RO  | Romanian (Romania)                                      |
| ru     | Russian                                                 |
| ru-RU  | Russian (Russia)                                        |
| sa     | Sanskrit                                                |
| sa-IN  | Sanskrit (India)                                        |
| se     | Sami (Northern)                                         |
| se-FI  | Sami (Northern) (Finland)                               |
| se-FI  | Sami (Skolt) (Finland)                                  |
| se-FI  | Sami (Inari) (Finland)                                  |
| se-NO  | Sami (Northern) (Norway)                                |
| se-NO  | Sami (Lule) (Norway)                                    |
| se-NO  | Sami (Southern) (Norway)                                |
| se-SE  | Sami (Northern) (Sweden)                                |
| se-SE  | Sami (Lule) (Sweden)                                    |
| se-SE  | Sami (Southern) (Sweden)                                |
| sk     | Slovak                                                  |
| sk-SK  | Slovak (Slovakia)                                       |
| sl     | Slovenian                                               |
| sl-SI  | Slovenian (Slovenia)                                    |
| sq     | Albanian                                                |
| sq-AL  | Albanian (Albania)                                      |
| sr-BA  | Serbian (Latin) (Bosnia and Herzegovina)                |
| sr-BA  | Serbian (Cyrillic) (Bosnia and Herzegovina)             |
| sr-SP  | Serbian (Latin) (Serbia and Montenegro)                 |
| sr-SP  | Serbian (Cyrillic) (Serbia and Montenegro)              |
| sv     | Swedish                                                 |
| sv-FI  | Swedish (Finland)                                       |
| sv-SE  | Swedish (Sweden)                                        |
| sw     | Swahili                                                 |
| sw-KE  | Swahili (Kenya)                                         |
| syr    | Syriac                                                  |
| syr-SY | Syriac (Syria)                                          |
| ta     | Tamil                                                   |
| ta-IN  | Tamil (India)                                           |
| te     | Telugu                                                  |
| te-IN  | Telugu (India)                                          |
| th     | Thai                                                    |
| th-TH  | Thai (Thailand)                                         |
| tl     | Tagalog                                                 |
| tl-PH  | Tagalog (Philippines)                                   |
| tn     | Tswana                                                  |
| tn-ZA  | Tswana (South Africa)                                   |
| tr     | Turkish                                                 |
| tr-TR  | Turkish (Turkey)                                        |
| tt     | Tatar                                                   |
| tt-RU  | Tatar (Russia)                                          |
| ts     | Tsonga                                                  |
| uk     | Ukrainian                                               |
| uk-UA  | Ukrainian (Ukraine)                                     |
| ur     | Urdu                                                    |
| ur-PK  | Urdu (Islamic Republic of Pakistan)                     |
| uz     | Uzbek (Latin)                                           |
| uz-UZ  | Uzbek (Latin) (Uzbekistan)                              |
| uz-UZ  | Uzbek (Cyrillic) (Uzbekistan)                           |
| vi     | Vietnamese                                              |
| vi-VN  | Vietnamese (Viet Nam)                                   |
| xh     | Xhosa                                                   |
| xh-ZA  | Xhosa (South Africa)                                    |
| zh     | Chinese                                                 |
| zh-CN  | Chinese (S)                                             |
| zh-HK  | Chinese (Hong Kong)                                     |
| zh-MO  | Chinese (Macau)                                         |
| zh-SG  | Chinese (Singapore)                                     |
| zh-TW  | Chinese (T)                                             |
| zu     | Zulu                                                    |
| zu-ZA  | Zulu (South Africa)                                     |
