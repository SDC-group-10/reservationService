1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
var fs = require("fs");
var adverbs = ["Very", "Perfectly", "Awesomely"];
var adjectives = [
  "Luxurious",
  "Captivating",
  "Impeccable",
  "Stainless",
  "Landscaped",
  "Charming",
  "Beautiful",
  "Gentle",
  "Spotless",
  "Updated",
  "Modern",
  "Palatial",
  "Pastoral",
  "Peaceful",
  "Picturesque",
  "Private",
  "Quaint",
  "Rare",
  "Rustic",
  "Secluded",
  "Remarkable",
  "Reinvented",
  "Rennovated",
  "Sophisticated",
  "Stately",
  "Fully furnished",
  "Gorgeous",
  "Pleasant",
  "Enthralling",
  "Cloistered",
  "Remote",
  "Reserved",
  "Sequestered",
  "Hermetic",
  "Reclusive",
  "Vintage"
];
var type = [
  "1 BR Apartment",
  "2 BR Apartment",
  "3 BR Apartment",
  "4 BR Apartment",
  "5 BR Apartment",
  "6 BR Apartment",
  "7 BR Apartment",
  "8 BR Apartment",
  "9 BR Apartment",
  "10 BR Apartment",
  "1 BR Home",
  "2 BR Home",
  "3 BR Home",
  "4 BR Home",
  "5 BR Home",
  "6 BR Home",
  "7 BR Home",
  "8 BR Home",
  "9 BR Home",
  "10 BR Home",
  "1 BR Outhouse",
  "2 BR Outhouse",
  "3 BR Outhouse",
  "4 BR Outhouse",
  "5 BR Outhouse",
  "6 BR Outhouse",
  "7 BR Outhouse",
  "8 BR Outhouse",
  "9 BR Outhouse",
  "10 BR Outhouse",
  "1 BR Guest Room",
  "2 BR Guest Room",
  "3 BR Guest Room",
  "4 BR Guest Room",
  "5 BR Guest Room",
  "6 BR Guest Room",
  "7 BR Guest Room",
  "8 BR Guest Room",
  "9 BR Guest Room",
  "10 BR Guest Room",
  "1 BR Bunk Room",
  "2 BR Bunk Room",
  "3 BR Bunk Room",
  "4 BR Bunk Room",
  "5 BR Bunk Room",
  "6 BR Bunk Room",
  "7 BR Bunk Room",
  "8 BR Bunk Room",
  "9 BR Bunk Room",
  "10 BR Bunk Room",
  "1 BR Chamber",
  "2 BR Chamber",
  "3 BR Chamber",
  "4 BR Chamber",
  "5 BR Chamber",
  "6 BR Chamber",
  "7 BR Chamber",
  "8 BR Chamber",
  "9 BR Chamber",
  "10 BR Chamber",
  "1 BR Bachelor Pad",
  "2 BR Bachelor Pad",
  "3 BR Bachelor Pad",
  "4 BR Bachelor Pad",
  "5 BR Bachelor Pad",
  "6 BR Bachelor Pad",
  "7 BR Bachelor Pad",
  "8 BR Bachelor Pad",
  "9 BR Bachelor Pad",
  "10 BR Bachelor Pad",
  "1 BR Studio",
  "2 BR Studio",
  "3 BR Studio",
  "4 BR Studio",
  "5 BR Studio",
  "6 BR Studio",
  "7 BR Studio",
  "8 BR Studio",
  "9 BR Studio",
  "10 BR Studio",
  "1 BR Family Home",
  "2 BR Family Home",
  "3 BR Family Home",
  "4 BR Family Home",
  "5 BR Family Home",
  "6 BR Family Home",
  "7 BR Family Home",
  "8 BR Family Home",
  "9 BR Family Home",
  "10 BR Family Home",
  "1 BR Retreat",
  "2 BR Retreat",
  "3 BR Retreat",
  "4 BR Retreat",
  "5 BR Retreat",
  "6 BR Retreat",
  "7 BR Retreat",
  "8 BR Retreat",
  "9 BR Retreat",
  "10 BR Retreat",
  "1 BR Penthouse",
  "2 BR Penthouse",
  "3 BR Penthouse",
  "4 BR Penthouse",
  "5 BR Penthouse",
  "6 BR Penthouse",
  "7 BR Penthouse",
  "8 BR Penthouse",
  "9 BR Penthouse",
  "10 BR Penthouse",
  "1 BR Condos",
  "2 BR Condos",
  "3 BR Condos",
  "4 BR Condos",
  "5 BR Condos",
  "6 BR Condos",
  "7 BR Condos",
  "8 BR Condos",
  "9 BR Condos",
  "10 BR Condos",
  "1 BR Suite",
  "2 BR Suite",
  "3 BR Suite",
  "4 BR Suite",
  "5 BR Suite",
  "6 BR Suite",
  "7 BR Suite",
  "8 BR Suite",
  "9 BR Suite",
  "10 BR Suite",
  "1 BR Dorm",
  "2 BR Dorm",
  "3 BR Dorm",
  "4 BR Dorm",
  "5 BR Dorm",
  "6 BR Dorm",
  "7 BR Dorm",
  "8 BR Dorm",
  "9 BR Dorm",
  "10 BR Dorm",
  "1 BR Abode",
  "2 BR Abode",
  "3 BR Abode",
  "4 BR Abode",
  "5 BR Abode",
  "6 BR Abode",
  "7 BR Abode",
  "8 BR Abode",
  "9 BR Abode",
  "10 BR Abode",
  "1 BR Residence",
  "2 BR Residence",
  "3 BR Residence",
  "4 BR Residence",
  "5 BR Residence",
  "6 BR Residence",
  "7 BR Residence",
  "8 BR Residence",
  "9 BR Residence",
  "10 BR Residence",
  "1 BR Homestead",
  "2 BR Homestead",
  "3 BR Homestead",
  "4 BR Homestead",
  "5 BR Homestead",
  "6 BR Homestead",
  "7 BR Homestead",
  "8 BR Homestead",
  "9 BR Homestead",
  "10 BR Homestead",
  "1 BR Hostel",
  "2 BR Hostel",
  "3 BR Hostel",
  "4 BR Hostel",
  "5 BR Hostel",
  "6 BR Hostel",
  "7 BR Hostel",
  "8 BR Hostel",
  "9 BR Hostel",
  "10 BR Hostel",
  "1 BR Sanctuary",
  "2 BR Sanctuary",
  "3 BR Sanctuary",
  "4 BR Sanctuary",
  "5 BR Sanctuary",
  "6 BR Sanctuary",
  "7 BR Sanctuary",
  "8 BR Sanctuary",
  "9 BR Sanctuary",
  "10 BR Sanctuary",
  "1 BR Detached House",
  "2 BR Detached House",
  "3 BR Detached House",
  "4 BR Detached House",
  "5 BR Detached House",
  "6 BR Detached House",
  "7 BR Detached House",
  "8 BR Detached House",
  "9 BR Detached House",
  "10 BR Detached House",
  "1 BR Motel",
  "2 BR Motel",
  "3 BR Motel",
  "4 BR Motel",
  "5 BR Motel",
  "6 BR Motel",
  "7 BR Motel",
  "8 BR Motel",
  "9 BR Motel",
  "10 BR Motel",
  "1 BR Hut",
  "2 BR Hut",
  "3 BR Hut",
  "4 BR Hut",
  "5 BR Hut",
  "6 BR Hut",
  "7 BR Hut",
  "8 BR Hut",
  "9 BR Hut",
  "10 BR Hut",
  "1 BR Bungalow",
  "2 BR Bungalow",
  "3 BR Bungalow",
  "4 BR Bungalow",
  "5 BR Bungalow",
  "6 BR Bungalow",
  "7 BR Bungalow",
  "8 BR Bungalow",
  "9 BR Bungalow",
  "10 BR Bungalow",
  "1 BR Manor",
  "2 BR Manor",
  "3 BR Manor",
  "4 BR Manor",
  "5 BR Manor",
  "6 BR Manor",
  "7 BR Manor",
  "8 BR Manor",
  "9 BR Manor",
  "10 BR Manor",
  "1 BR Casa",
  "2 BR Casa",
  "3 BR Casa",
  "4 BR Casa",
  "5 BR Casa",
  "6 BR Casa",
  "7 BR Casa",
  "8 BR Casa",
  "9 BR Casa",
  "10 BR Casa",
  "1 BR Ranch Style Home",
  "2 BR Ranch Style Home",
  "3 BR Ranch Style Home",
  "4 BR Ranch Style Home",
  "5 BR Ranch Style Home",
  "6 BR Ranch Style Home",
  "7 BR Ranch Style Home",
  "8 BR Ranch Style Home",
  "9 BR Ranch Style Home",
  "10 BR Ranch Style Home",
  "1 BR Cabin",
  "2 BR Cabin",
  "3 BR Cabin",
  "4 BR Cabin",
  "5 BR Cabin",
  "6 BR Cabin",
  "7 BR Cabin",
  "8 BR Cabin",
  "9 BR Cabin",
  "10 BR Cabin",
  "1 BR Hotel",
  "2 BR Hotel",
  "3 BR Hotel",
  "4 BR Hotel",
  "5 BR Hotel",
  "6 BR Hotel",
  "7 BR Hotel",
  "8 BR Hotel",
  "9 BR Hotel",
  "10 BR Hotel",
  "1 BR Duplex",
  "2 BR Duplex",
  "3 BR Duplex",
  "4 BR Duplex",
  "5 BR Duplex",
  "6 BR Duplex",
  "7 BR Duplex",
  "8 BR Duplex",
  "9 BR Duplex",
  "10 BR Duplex"
];
var cities = [
  "Aberdeen",
  "Abilene",
  "Akron",
  "Albany",
  "Albuquerque",
  "Alexandria",
  "Allentown",
  "Amarillo",
  "Anaheim",
  "Anchorage",
  "Ann Arbor",
  "Antioch",
  "Apple Valley",
  "Appleton",
  "Arlington",
  "Arvada",
  "Asheville",
  "Athens",
  "Atlanta",
  "Atlantic City",
  "Augusta",
  "Aurora",
  "Austin",
  "Bakersfield",
  "Baltimore",
  "Barnstable",
  "Baton Rouge",
  "Beaumont",
  "Bel Air",
  "Bellevue",
  "Berkeley",
  "Bethlehem",
  "Billings",
  "Birmingham",
  "Bloomington",
  "Boise",
  "Boise City",
  "Bonita Springs",
  "Boston",
  "Boulder",
  "Bradenton",
  "Bremerton",
  "Bridgeport",
  "Brighton",
  "Brownsville",
  "Bryan",
  "Buffalo",
  "Burbank",
  "Burlington",
  "Cambridge",
  "Canton",
  "Cape Coral",
  "Carrollton",
  "Cary",
  "Cathedral City",
  "Cedar Rapids",
  "Champaign",
  "Chandler",
  "Charleston",
  "Charlotte",
  "Chattanooga",
  "Chesapeake",
  "Chicago",
  "Chula Vista",
  "Cincinnati",
  "Clarke County",
  "Clarksville",
  "Clearwater",
  "Cleveland",
  "College Station",
  "Colorado Springs",
  "Columbia",
  "Columbus",
  "Concord",
  "Coral Springs",
  "Corona",
  "Corpus Christi",
  "Costa Mesa",
  "Dallas",
  "Daly City",
  "Danbury",
  "Davenport",
  "Davidson County",
  "Dayton",
  "Daytona Beach",
  "Deltona",
  "Denton",
  "Denver",
  "Des Moines",
  "Detroit",
  "Downey",
  "Duluth",
  "Durham",
  "El Monte",
  "El Paso",
  "Elizabeth",
  "Elk Grove",
  "Elkhart",
  "Erie",
  "Escondido",
  "Eugene",
  "Evansville",
  "Fairfield",
  "Fargo",
  "Fayetteville",
  "Fitchburg",
  "Flint",
  "Fontana",
  "Fort Collins",
  "Fort Lauderdale",
  "Fort Smith",
  "Fort Walton Beach",
  "Fort Wayne",
  "Fort Worth",
  "Frederick",
  "Fremont",
  "Fresno",
  "Fullerton",
  "Gainesville",
  "Garden Grove",
  "Garland",
  "Gastonia",
  "Gilbert",
  "Glendale",
  "Grand Prairie",
  "Grand Rapids",
  "Grayslake",
  "Green Bay",
  "GreenBay",
  "Greensboro",
  "Greenville",
  "Gulfport-Biloxi",
  "Hagerstown",
  "Hampton",
  "Harlingen",
  "Harrisburg",
  "Hartford",
  "Havre de Grace",
  "Hayward",
  "Hemet",
  "Henderson",
  "Hesperia",
  "Hialeah",
  "Hickory",
  "High Point",
  "Hollywood",
  "Honolulu",
  "Houma",
  "Houston",
  "Howell",
  "Huntington",
  "Huntington Beach",
  "Huntsville",
  "Independence",
  "Indianapolis",
  "Inglewood",
  "Irvine",
  "Irving",
  "Jackson",
  "Jacksonville",
  "Jefferson",
  "Jersey City",
  "Johnson City",
  "Joliet",
  "Kailua",
  "Kalamazoo",
  "Kaneohe",
  "Kansas City",
  "Kennewick",
  "Kenosha",
  "Killeen",
  "Kissimmee",
  "Knoxville",
  "Lacey",
  "Lafayette",
  "Lake Charles",
  "Lakeland",
  "Lakewood",
  "Lancaster",
  "Lansing",
  "Laredo",
  "Las Cruces",
  "Las Vegas",
  "Layton",
  "Leominster",
  "Lewisville",
  "Lexington",
  "Lincoln",
  "Little Rock",
  "Long Beach",
  "Lorain",
  "Los Angeles",
  "Louisville",
  "Lowell",
  "Lubbock",
  "Macon",
  "Madison",
  "Manchester",
  "Marina",
  "Marysville",
  "McAllen",
  "McHenry",
  "Medford",
  "Melbourne",
  "Memphis",
  "Merced",
  "Mesa",
  "Mesquite",
  "Miami",
  "Milwaukee",
  "Minneapolis",
  "Miramar",
  "Mission Viejo",
  "Mobile",
  "Modesto",
  "Monroe",
  "Monterey",
  "Montgomery",
  "Moreno Valley",
  "Murfreesboro",
  "Murrieta",
  "Muskegon",
  "Myrtle Beach",
  "Naperville",
  "Naples",
  "Nashua",
  "Nashville",
  "New Bedford",
  "New Haven",
  "New London",
  "New Orleans",
  "New York",
  "New York City",
  "Newark",
  "Newburgh",
  "Newport News",
  "Norfolk",
  "Normal",
  "Norman",
  "North Charleston",
  "North Las Vegas",
  "North Port",
  "Norwalk",
  "Norwich",
  "Oakland",
  "Ocala",
  "Oceanside",
  "Odessa",
  "Ogden",
  "Oklahoma City",
  "Olathe",
  "Olympia",
  "Omaha",
  "Ontario",
  "Orange",
  "Orem",
  "Orlando",
  "Overland Park",
  "Oxnard",
  "Palm Bay",
  "Palm Springs",
  "Palmdale",
  "Panama City",
  "Pasadena",
  "Paterson",
  "Pembroke Pines",
  "Pensacola",
  "Peoria",
  "Philadelphia",
  "Phoenix",
  "Pittsburgh",
  "Plano",
  "Pomona",
  "Pompano Beach",
  "Port Arthur",
  "Port Orange",
  "Port Saint Lucie",
  "Port St. Lucie",
  "Portland",
  "Portsmouth",
  "Poughkeepsie",
  "Providence",
  "Provo",
  "Pueblo",
  "Punta Gorda",
  "Racine",
  "Raleigh",
  "Rancho Cucamonga",
  "Reading",
  "Redding",
  "Reno",
  "Richland",
  "Richmond",
  "Richmond County",
  "Riverside",
  "Roanoke",
  "Rochester",
  "Rockford",
  "Roseville",
  "Round Lake Beach",
  "Sacramento",
  "Saginaw",
  "Saint Louis",
  "Saint Paul",
  "Saint Petersburg",
  "Salem",
  "Salinas",
  "Salt Lake City",
  "San Antonio",
  "San Bernardino",
  "San Buenaventura",
  "San Diego",
  "San Francisco",
  "San Jose",
  "Santa Ana",
  "Santa Barbara",
  "Santa Clara",
  "Santa Clarita",
  "Santa Cruz",
  "Santa Maria",
  "Santa Rosa",
  "Sarasota",
  "Savannah",
  "Scottsdale",
  "Scranton",
  "Seaside",
  "Seattle",
  "Sebastian",
  "Shreveport",
  "Simi Valley",
  "Sioux City",
  "Sioux Falls",
  "South Bend",
  "South Lyon",
  "Spartanburg",
  "Spokane",
  "Springdale",
  "Springfield",
  "St. Louis",
  "St. Paul",
  "St. Petersburg",
  "Stamford",
  "Sterling Heights",
  "Stockton",
  "Sunnyvale",
  "Syracuse",
  "Tacoma",
  "Tallahassee",
  "Tampa",
  "Temecula",
  "Tempe",
  "Thornton",
  "Thousand Oaks",
  "Toledo",
  "Topeka",
  "Torrance",
  "Trenton",
  "Tucson",
  "Tulsa",
  "Tuscaloosa",
  "Tyler",
  "Utica",
  "Vallejo",
  "Vancouver",
  "Vero Beach",
  "Victorville",
  "Virginia Beach",
  "Visalia",
  "Waco",
  "Warren",
  "Washington",
  "Waterbury",
  "Waterloo",
  "West Covina",
  "West Valley City",
  "Westminster",
  "Wichita",
  "Wilmington",
  "Winston",
  "Winter Haven",
  "Worcester",
  "Yakima",
  "Yonkers",
  "York",
  "Youngstown"
];
 
var count = 0;
const file = fs.createWriteStream("./listings1.csv");
for (var i = 0; i < adjectives.length; i++) {
  for (var j = 0; j < type.length; j++) {
    for (var k = 0; k < cities.length; k++) {
      // for (var z = 0; z < adverbs.length; z++) {
      count++;
      if (i + j + k === adjectives.length + type.length + cities.length - 3) {
        console.log(count + 4019400);
      }
      file.write(
        " " +
          (4019400 + count) +
          ". " +
          adverbs[0] +
          " " +
          adjectives[i] +
          ", " +
          type[j] +
          " in " +
          cities[k] +
          `\n`
      );
      // }
    }
  }
}
file.end();