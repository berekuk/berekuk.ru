---
path: /cv
header: false
title: Vyacheslav Matyuhin - CV
---

# Vyacheslav Matyuhin

**Full-stack developer with 15+ years of experience, mostly web-related.<br>Founder of Kocherga, a large rationalist community in Russia.**

---

# Skills and knowledge

## IT

Frontend:

- currently preferred stack: Next.js, React, Apollo GraphQL, Typescript, Tailwind
- experience with: Redux, MobX, styled-components
- past experience, long forgotten: CoffeeScript, Backbone.js

Backend:

- Python: Django, Wagtail, Flask/Quart
- databases: mostly MySQL; SQLite; some MongoDB long time ago
- past experience, long forgotten: Perl

SRE:

- Kubernetes (set up a tiny k3s cluster, converted an existing setup into 20+ deployments with helm)
- Terraform
- Ansible
- CI/CD on GitLab
- various tools: Grafana, Prometheus, Metabase

Various:

- wrote a few Slack bots
- contributed to open source back when I participated in Perl community

## Rationality

Organized the Russian rationalist community in various roles since 2013.

Taught rationality classes and usually acted as a primary trainer at 40+ commercial workshops and trainings.

Attended a [CFAR](https://rationality.org/) workshop in Prague in September 2018.

## Management & community building

- whatever general skills you might expect from running a small business for 6 years
- Scrum (implemented the process in a team of 9 developers, ran retrospectives and standups)
- moderation experience in various rationality-related chats
- I ran and helped others to run a lot of various rationality-related meetups over the last 10 years

## Various

Forecasting:

- I'm a member of the [Foretell Pro Forecaster team](https://www.cset-foretell.com/open-call-pro-forecasters) (no significant track record yet)
- I had some relative success on Metaculus, e.g. I'm [#6 overall on "points per question" metric](https://metaculusextras.com/points_per_question)

---

# Experience log

## Kocherga (2015-...), cofounder/CEO/CTO

In 2015 I left Yandex and started [Kocherga](https://kocherga-club.ru/), a local venue in Moscow which hosted 40-50 rationality-adjacent events per month. A long report on Kocherga can be found in [this LessWrong post](https://www.lesswrong.com/posts/WmfapdnpFfHWzkdXY/rationalist-community-hub-in-moscow-3-years-retrospective).

I wore many different hats, as can be expected in a new business:

- hired, trained and fired staff members
- paid taxes, dealt with various legal stuff
- replaced lightbulbs, painted walls, assembled furniture
- organized events, gave lots of rationality-related talks and classes, designed applied rationality curriculums
- acted as a community manager to empower others to organize the events

I also put a lot of effort into Kocherga's website and intranet (incl. its backend, in which many business processes are automated and the data is collected in analytics-friendly way). [The code is open-source](https://gitlab.com/kocherga/core/) and is built with a modern tech stack: Next.js, Apollo GraphQL, TypeScript, Django, Kubernetes.

## Questhub (2013), founder

In 2013 I asked Yandex for a long unpaid vacation and built a specialized social network / task tracker. The idea was to build a social, gamified public task tracker for communities to help people get motivated to do stuff and increase their impact.

At the end of 2013 I had to decide whether I wanted to stay on Questhub (this meant losing the significant portion of an unvested stock options at Yandex) or go back to Yandex. Questhub didn't have enough traction by then, so I had to put it on hold; I also got skeptical about the whole "share your goals to get motivated" premise due to [Peter Gollwitzer's research](https://blog.trello.com/science-backed-reasons-you-shouldnt-share-your-goals). I shut down Questhub entirely in 2017.

The source code for Questhub is [published here](https://github.com/berekuk/questhub). Tech stack: Perl 5, MongoDB, SPA over REST API, CoffeeScript, Backbone.JS.

(The closest project to Questhub that I know of is [SmartProgress](https://smartprogress.do/).)

## LessWrong Moscow (2013-2015), meetups organizer

I joined the local LessWrong meetups in Moscow at the beginning of 2013 after lurking on [LessWrong.com](https://lesswrong.com) for many years (I think I followed it since the original [Overcoming Bias](https://www.overcomingbias.com/)).

When I joined, the bi-weekly meetups had around 8 attendees; over the next two years we grew to 30-40.

By 2015 I decided that I wanted to work on community building and rationality full time and started Kocherga (see above).

## Yandex blog search (2006-2013), software developer

I joined [Yandex](https://en.wikipedia.org/wiki/Yandex) ("Russian Google", the largest tech company in Russia) in 2006 when it had around 200 employees. When I left, it grew to 5000+.

For the most of my time at Yandex I worked as a software developer on a blog search project. We collected data from 100M+ RSS feeds and blog post comments and provided an almost-instant search over them, plus some related services.

Tech stack: Perl 5 and some Python, MySQL, Debian.

Examples of challenges:

- helped to build a custom distributed storage for blog comments which acted as a HTTP proxy to SQLite files
- helped to build a custom log-based message queue for various streams of data we had to handle (high-bandwidth, e.g. including the feed from twitter with all tweets, though it was around 2010, so it wasn't _that_ huge)
- built pagerank-like algorithms for calculating the "best of" lists of the most influential blogs and daily blog posts

I contributed to open source in that period, most notably by publishing [Ubic](https://github.com/berekuk/Ubic/). I believe it's still used in [cPanel](https://en.wikipedia.org/wiki/CPanel) (which is scary, considering that it wasn't really maintained for 5+ years...).

I also successfully implemented the Scrum process in our ~9 people team and served as a Scrum master.

## NetUP (2005-2006), software developer

This was my first job. I coded some parts of the desktop client in Java 5 AWT / Swing for a billing system. I don't remember much about this time.

---

# Education

I attended [Moscow State University Faculty of Mechanics and Mathematics](https://en.wikipedia.org/wiki/MSU_Faculty_of_Mechanics_and_Mathematics).

Note: I dropped out in the last year of study and didn't graduate.
