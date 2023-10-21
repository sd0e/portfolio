---
name: 'LiveTransit HK'
headline: 'Live HK bus departure times'
languages: ['React', 'JavaScript']
month: 'Jul'
year: 2021
link: ['http://livetransit.sebdoe.com/', 'https://github.com/sd0e/livetransit']
priority: 1
---

My first React app, this project provided an interesting opportunity to both use an API which was new at the time and to combine various sources of data, containing many edge cases.

![a screenshot of a bus route loaded on the webpage](/images/live-transit.png)

At the time of development, the Government of Hong Kong had recently released an API with departure information for most Hong Kong buses in conjunction with the bus companies. I thought it would be an interesting opportunity to look at parsing a large amount of data into a unified site.

In order to fetch the bus information, since each company had a different API the site had to fetch from multiple APIs. Of course, in such a large city it is possible for there to be many providers for a given route number on different services, and as it turns out this is the case on a large number of services. The site had to determine whether to go straight to the route information if only one provider served a route or display the possible provider options.

Since the APIs did not all have the same format, the site also had to translate this to a uniform one, and it was important to do this in a way which did not slow the site down significantly, given these requests were happening client-side. Some more added complexity was that certain minibus routes had express routes as well as normal routes, so another prompt page was required to deal with this.

Once a route was chosen, it had to fetch a separate endpoint to get the stop information for this route, or one for each stop in the case of minibuses! This took a couple of seconds, so I rendered minimal origin and destination information in the meantime so that the user could navigate back if it was not correct.

Given it was my first React project, I would have done things differently if I were to do it again now, for example implementing a backend with prefetching once a route had been loaded. However, this was a very interesting experience.