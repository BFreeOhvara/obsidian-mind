---

# Setter Script — Section 2: Vitals Check Transcripts

---

## AI Agency Cold Calling [Step-by-Step Guide] - Part 1

Source: https://www.youtube.com/watch?v=1yLD_WyupBo

in this video series I'm documenting
from a to zed exactly in real time how I
build an outbound AI calling machine to
land clients at scale for my digital
marketing agency this is episode one
let's jump in all right so this is where
we get started I saw a c fluent ad pop
on on my YouTube and I'm going to jump
into this now we're going to be doing
outbound AI calls at Scales so I'm going
to choose this one I think this is like
a Black Friday deal um let's go fill
this out going to fill this out all
right we're in new workspace all right I
need to set up a twio account which I
actually don't have uh never mind I wait
okay I don't think I have one well this
is super confusing I hate it the problem
is is that twio bought aie and I used to
have aie and now the accounts are a mess
so poor user experience all right we've
connected this to aie let's build out
the agent we do an outbound agent select
a template or start from scratch I'm
going to choose health care all right
let's test out Sam Rivera okay name it's
fine language now I want to give this
person an accent because I think that
will cover up the fact it's a robot a
little bit so let's try New Zealand
voice mly go with the mail okay I need a
better phone number than that just going
to choose a random Us number here all
right let's go let's initiate this
registration if we can all right we're
going to go through and set this number
up I'm not going to worry about about
the DLC registration right now that's
only for text messaging so voicemail I'm
not going to bother with it answer
creativity I'm going to go with an eight
context Max tokens determine how much
context for each answer I don't know the
pros and cons of that I'll just leave it
at default speech stop sensitivity
select how many words should stop the
agent speech two is good 25 silence
message delay I'm going to bring this
down to 4 seconds 10 is a lot we'll do
20 uh end the call if there's 15 seconds
of Silence utterance detection how long
to wait before utterance ends I don't
know what that means but let's just go
with 800 to make it more responsive
concurrent answer Gene start generating
answer if the pause between words is
minimum 150 millisecs okay that's fine
transcribe filler words I'm going put
that on okay agent configuration tell
your agent what is his goal primary goal
is to provide okay so a little bit of
okay let's use Chachi you to help us
here your primary goal is to provide
deficient and compassionate Patient
Service okay that's totally wrong um
this is like for someone who is calling
the actual medical practice well let's
just work with what we have I'm going to
tell chat this is an example prompt for
an AI voice agent use it as an example
now we are going to make a new prompt
all right the new prompt is going to be
an outbound sales rep for my agency
North digital um they're going to be
calling chiropractor offices and
physiotherapy offices um so kind of like
mid-range ticket medical practices and I
want them so okay this it's going to be
somewhat obvious to someone intelligent
this is an AI robot so to navigate that
weakness I actually want to be upfront
about the fact that hey this is I'm
calling on behalf of Sean from North
digital we have an AI marketing agency
that helps Healthcare practices sign on
new patients and our AI agent actually
follows up with all of the leads we
generate in real time and can lighten
the work of the receptionist and then
you can say in fact believe it or not
you're talking to an AI right now now
Sean the business owner will get a
transcript of this call but feel free to
test me out ask me some funny questions
and see how responsive I am this will be
similar to what we set up for healthcare
practices we have a decade history of
writing ads and the addition of the AI
is what we're focusing on right now um
turn all of that into a concise script
that you think would make this AI voice
agent most
effective okay but you didn't follow the
example script that this is fine and
that you told the person what to say but
if you see the examp example the example
script gave the AI agent more General
guidelines for example it said your aim
is to schedule reschedule cancel so in
this case the aim of the AI is to um
book a appointment with Shawn a 15minute
zoom call to go through the system that
is the goal of the the agent um you
can't just give it a word for word
script to get there you can give it a
some word for word guidelines but the AI
is going to be self-guided towards that
goal and the goal of this call is simply
to get the email from the receptionist
that you're going to be calling or the
AI agent's going to be calling and a
good time for a meeting and then say
Shan will send you a calendar invitation
at that time please give me your email
address and your cell phone to receive a
text message reminder now remember this
AI agent is going to be talking to the
receptionist so in a sense be self-aware
that the AI is not going to be replacing
the job of the receptionist but when
adding on this marketing is not going to
be any more work for the receptionist
because the AI is going to be doing it
so just this the only way this is going
to work is if the AI is almost like
self-aware and somewhat humorous even
self-deprecating about the fact it's an
AI um but that can be layered in maybe
10 or 20 seconds into the call okay give
me another script and again this is the
framework we feeding the AI agent okay
let's see if this skills better all
right this looks good this looks good
this is this is long but chat to go into
town on this okay uh let's see if this
works man I don't know why it does this
but chat PT really needs to improve its
copy paste functionality all right
actually I need to I need to modify this
one more time all right so they have
some templates only for a restaurant so
it's not super useful okay I'm going to
upload this image and tell break down
the instructions based on the headings
here and make it easy for me to copy
paste okay let's go goal background it's
funny I feel like all these AI companies
like they're UI is always a little bit
glitchy but that's part of the game okay
instructions goal background all that
good to go I'm going to turn the script
off for now submit as a side note I
wonder how unhinged you could in theory
make these agents like I wonder if
there's terms of service if they check
it but we're going to be PG-13 in this
video web hook endpoint okay now I need
to flip over to a blog post here we are
how to automate outbound calls with call
Fluid AI Z or Google Sheets call flu AI
okay so this is the blog post I'm going
to follow for this experiment and all
right so it says create a spreadsheet
with name and phone number okay so
looking at this before we get to all
these steps the first step is going to
be to generate a list of potential leads
and if we scroll down to this one it's
going to going to be something like this
so let me create the example spreadsheet
okay we're going to do business name
Business website front desk phone number
receptionist name find on website these
are instructions for a VA by the way um
City doctor name 1 doctor name 2 Dr name
three Dr cell phone if possible one okay
I'm going to call this call fluent Cairo
rmt list USA share anyone with the link
can edit all right now to hire the VA
I'm using a brand new VA Marketplace SLS
system I'll put the link in the bio my
good friend Kim has built this out and
I'm one of their B DET testers so let's
jump in all right create a list of 200
caropractor rmt data scraping how igin
is this 24 hours how important is this
Cent Quest what skill does this task
require data scraping it's about it
estimated time to complete H I'm going
to put 3 hours or 300 minutes it's close
enough we're going to put due date as
tomorrow and I think that should be
self-explanatory submit and here we have
the email confirmation let's go that's
episode one of this video I'll be back
tomorrow with a follow-up video and you
guys will see this through all the way
to the end if you want to try Kim's VA
Marketplace I will put the link Link in
the video description below click that
link check it out until next time I'll
see you later

---

## Cold Calling for AI Agencies in 2026: Complete Step-by-Step Guide

Source: https://www.youtube.com/watch?v=PPtlG5N6OpQ

Most AI agency owners are terrified of
cold calling, including me when I was
starting out. What they don't realize is
that 55% of high growth companies still
use it as one of their main strategies
because it is one of the most direct
form of outreach and one of the most
effective if you know how to do it
right. First of all, when it comes to
cold calling, 20% [music] is what you
say, 80% is how you say it. So, the way
that you say your tonality, the way that
you go through things is much more
important than the actual script itself.
The actual script that I'm going to be
breaking down today is going to be for
the inbound receptionist offer for a
roofer. The first step is making a list
using API and Google maps. The second
step is adding the details into a Google
sheet that looks like this where we have
three different columns because a
business actually has a problem that we
can solve with an inbound receptionist.
And so what we do is we call each
business after hours and we check
whether they answer they didn't answer.
If they answer then we put answered. If
they didn't answer they put no answered
and they move on to the next round. if
they did [music] not answer because then
we can cold call them using this exact
script and these objection handles as
well to be able to then pitch our
service. I've made a full video breaking
this whole framework down step by step.
I even give you the whole Miro board for
free. If you want access to it, make
sure to check out the first thing down
below.

---

## Video 3

Source: https://www.youtube.com/watch?v=sxvvUe87t5E

No transcript available.

---

## Discovery Calls That Don't Suck: How to Uncover Real Pain FAST

Source: https://www.youtube.com/watch?v=swr2VsX5Ank

All right, discovery calls that don't
suck. You don't have much time on these
discovery calls. We want to cover how to
actually uncover real pain in these
conversations in 15 minutes and get a
solid next step solidified with a good
persona that you're targeting. Brought
on Eric again to help us with the
conversation. He's someone who's
probably more qualified than almost
anyone to talk about this. He sold at
small, medium, large organizations. Now
he's a founder running a lot of these
calls himself, training other people how
to run these calls. So, we're going to
go through how to actually break down a
discovery call, his process, and uh
Eric, thanks for being on here.
Yeah, of course, man. I appreciate it.
And anyone listening, I think if you've
seen Conor's content, my content as
well, you know, this is not some silver
bullet like golden script. It really is
to help you better understand
holistically how to approach this
situation such that regardless of what
happens, you're in a position to take
the best next step, whatever that may
be. So, thanks for having me, man.
Yeah. So, I mean to kick things off, I
think a lot of SDRs and and account
executives feel like they they dread
discovery. I know I did when I was a new
STR and I had promoted to account
executive and I didn't feel like I had a
process or framework down yet and and I
was using what was taught to me, but it
just felt stiff to me or it felt
scripted. Why at a high level do you
think, not to be harsh, but why do most
discovery calls suck? And why do reps
feel this way a lot of times before they
have a process they're comfortable or or
have down for themselves?
Totally. No, and I'm I'm fine to be
direct here. I think quite frankly,
first and foremost, you need to ask
yourself if you've done the work to
understand your product, understand your
persona, understand some of the most
important challenges that they face, not
just the solutions, but what are the
types of problems that you're you're
solving. So instead of coming to the
table and saying we help Samsung do XYZ
30% faster like what what was the actual
problem Samsung was having and what was
that problem on three different levels.
So to your initial question of why
people feel nervous when they first get
in these it's really the fear of the
unknown because everything's going great
so long as your prospect kind of asks or
dances in the stuff that you already
know if you're like 3 months in as an AE
and still learning. But beyond that,
it's like if they hit you with some
random super technical question instead
of learning how to understand that
ideally, but if not, also dance around
that with questions, uncover the real
impact of where that's coming from.
That's where I I would say AES,
especially 3 to 6 months either into
being an account executive for the first
time ever or at a new company are the
most nervous. And that's you're you're
playing scared and this hurts you last
thing in like multiple ways where one
you're only asking the questions that
you feel comfortable with and you feel
comfortable responding to. And then also
obviously the most glaring example if
you've been there and I have too. We've
all been there by the way. But if you
get, you know, told a response of like,
oh, this like low-level Kubernetes
feature XYZ, like that's super important
to us, and you're like, uh, uh, and then
you just freeze and lose all momentum
versus planning ahead, accepting the
fact that there are going to be times
you don't know the answer and how to
handle that. But it's also on you as a
rep to really understand uh, your
product, your problems that you solve
for, your personas, etc., etc. But
that's a high level.
I think that's that's spot on. I that's
exactly how I felt when I was a new SDR
um starting to first move into the A
role and run these discovery calls
myself was it was the fear of the
unknown and fear that I would get caught
flatfooted. I would come in with some
general questions prepared an idea of
how I thought the conversation felt but
I didn't have a consistent framework or
process for myself and in the back of my
head it was almost like when I was
learning cold calling for the first time
and you would get this fear in your head
like uhoh what are they going to say
next and how am I going to respond to
it. It was almost the same way on these
discovery calls where it's like if I ran
out of my prepared list of questions or
the conversation went in a different
direction completely than I was
expecting that I would just freeze up
and look like an idiot. Frankly, that
was my biggest fear going into all of
these calls. And it wasn't until I
implemented a consistent framework for
myself. And that's what I think reps
need to do is they take a step back
again with the cold call analogy. It
wasn't until I realized that the purpose
and at least in my opinion the purpose
of making a cold call is to set a
meeting and then I created a framework
around doing that and making the
structure of the cold call to set a
meeting. It became important to realize
from take a step back and be like what
is the purpose of a discovery call? Why
are we here? So from your perspective
what is the purpose of a discovery call
when you're getting on with one of these
prospects that you booked a meeting with
either over the phone or email?
Yeah and I think there's nuances to this
at every level. Um but obviously I would
say the ne the the first and like
universal thing is ideally to uncover
significant pain uh that is worth
solving within ideally a fiscal year or
calendar year. Um I again the timelines
and all of that is going to change. But
first and foremost if you don't have
real pain especially right now in 2025
it's not going to move the needle. I
can't tell you how many people I've
talked to uh both for this platform and
in my job that have something they could
solve in theory. They could get better
at sales. They could get better at
automation. They could get better at all
of these different things. But unless
they truly understand and feel that they
are leaving tons of money on the table
or are actively missing things because
of that, it's really difficult to
progress it forward. So that's like the
universal. And then I would say the
biggest difference I see from like SMB
selling to companies with maybe a 100
employees or less up to enterprise is in
the SMB space, if you want to cover
pain, you uncover that there's a real
potential to solve a problem here, it's
trying to accelerate that deal,
obviously get a next meeting set up, but
ideally escalate that rather quickly.
Whereas I would say the the highest
level big difference when you get more
into enterprise and strategic is maybe I
have a conversation with you Connor and
you kind of know there's a problem.
You're not super lukewarm or or you're
kind of just I don't know lukewarm in
general about the overall thing. You can
kind of articulate a problem don't
really know how impactful it is. Like
yes this would be great if it's solved
but I don't get the sense that you have
a real personal stake in this at the
enterprise level like SMB I might
disqualify or kind of ask them if they
can bring someone else like a director
to the table. Um whereas in the
enterprise sometimes maybe hey I'm
speaking with this one specific team at
a bank and they're lukewarm. Hey could
you introduce me to another team and
even though there's a chance I might
waste my time at the enterprise space I
find it often takes you know three to
five to seven discovery calls with the
same person in different teams to really
uncover that pain. Whereas the SMB space
it's usually much more clear if there is
one or is not. So that's a quick high
level on my side.
Well said. And the the only thing I'd
add to that too is at a high level I
view it as your your job is almost to
build trust with the prospect that you
are a subject matter expert in this
space. One like you understand a
potential painoint or challenge that
they're either aware of or maybe not
thinking of and potentially have a
solution for it. Your job isn't to sell
them on this call and that two you're
someone that actually is competent
enough to potentially help help them get
this done. They're almost doing some
subconscious math in their head like,
"Okay, do I actually think there's a
potential project here that could be
successful and look good for me from an
internal standpoint like brand boost,
promotion, things like that?" And and
how long is it going to take potentially
if I was to go through with this?
Because I guess to preface this too,
I've historically worked in roles where
to close a deal, it there are enterprise
level deals that generally take anywhere
from 5 to 10 calls plus. So, it's like
they could get on that first call and be
like, "Oh, solution looks pretty cool.
This could help out, but this person
kind of seems like a schmuck and they
don't know what they're doing." They're
not going to, even if they think it's a
potential good fit, they're an IT
director or something. They're thinking,
"Okay, I got to pull in my boss for this
to happen. They got to figure out how
they actually buy things internally.
That's going to take a whole bunch of
work." They have their own regular day
jobs and priorities they're focused on.
if they don't determine that you're
someone who actually knows what they're
talking about and can actually help them
and be good to work with going forward.
So that's just just know that that's
what their biggest fear is getting on
these calls is that they're going to get
on a 30-minute call, give you the
benefit of the doubt. You're going to
ask a series of salesy not great
questions. Tell me about this. What's
the impact of that on your business? And
then you're going to aggressively push
in a pushy way ask for even more of
their time at the end of the call. And
if you haven't earned their trust or
built credibility for yourself, the
math's not going to add up in their head
that this is worth another call or worth
them staking their internal brand to
bring in their boss or another
stakeholder to that next call. Um, so
that's why I do think it's really
important to come in with a structure
and a framework because that's what
actually helps you come across as
trustworthy and credible on these calls.
How do you break down a typical 30
minute discovery call in your head? I
know they don't all always go the same
way or according to plan, but in
general, what does a good discovery call
look like and how do you structure it?
Well, I think for context, too, when I
first was in AE leading discovery calls,
I was so worried about what questions to
ask, how to do this, how to set that
meeting, how to get the next step in
place. And honestly, over time, as you
get more like some of this is
experiential learning, right? So, I hope
this video helps you, but also you have
to take calls and not having an optimal
call is just part of this process,
especially early on. That being said, I
think the biggest thing that has helped
me to kind of take the burden off of
what question do I ask, which if you're
in that space, you're not present in the
call. You're not really having a great
dialogue. You're more worried about what
you say than what the prospect says. But
the biggest thing that's been an unlock
for me is just roughly speaking a
30-minute framework of 2 minutes
reserved for like people showing up
andor very brief introductions. I don't
show a slide. I set the stage as to why
we're here. I can get into that if you'd
like. The next 18 or so minutes, so this
would be in total the first 20 minutes
of the call is 100% focused on them. So
there's different frameworks. There's
medic, there's bant, there's command of
the message. Again, like a simple one,
if honestly, if you're familiar with
command of the message terminology, just
learning about their current state and
the negative consequences of what
they're doing. If I even just have an
in-depth conversation on that in a 30
minute call, that's usually a win. Now,
I would like to get to more. I can get
to more if we are having a good
conversation and they're very succinct,
they understand exactly what they need.
But I just want to preface like if I
just have a 30 minute conversation
around that and we're having a great
dialogue, a next follow-up call makes
sense for everyone. Like like that is a
great outcome in my opinion, especially
as you get to the enterprise space where
if someone is so deeply talking about
their problems, what they're doing, and
it really resonates and you know that,
let them go. I'm not trying to force
anything. I'm just I just want to hear
all about it because whether it's with
them, whether it's with someone else,
I'm in a great position on that next
call to kind of loop them in, show them
I understand, etc. But anyway, let's say
kind of cookie cutter prospect comes in,
they're willing to share information,
but they also want to see a glimpse of
our platform. Again, that first 20
minutes across the two-minute intro and
the 18minute just asking them questions
again generally about what they're doing
today and the negative consequences of
that. Maybe if I have time, like what
would an ideal solution look like
regardless of who it's from. Um then the
last 10 minutes of the call I spend
about 6 minutes if I have the time and
if it's appropriate talking about hey
here's two or three major things that
you mentioned and here's how that maps
onto our platform. Again pending the
vibe of the conversation that may be as
simple as literally showing one visual
slide. It may even be just a
conversation but I would say you know
it's not uncommon for me to hop into the
platform and show like two major
features. So you know in the case of
selling automation and someone wants to
automate this deployment sequence on XYZ
or whatever it is I may show you know
hey I'm going to recap what they said
validate that that's what they means and
again again this is in the sixinute uh
period here and then I'm going to show
them one or two things at most in the
platform that demonstrates that at a
high level set the tone that hey here's
what you wanted to see I'm going to show
this to you with the little time that we
have left but I'd love to go deeper into
it on our next call. So, I'm already
planting that seed as I'm pulling the
platform up.
But the big thing I'd say there is I'm
literally showing one or two platforms.
I'm not logging in. I'm not showing how
to create a team. I'm not showing how to
set up a new project. I'm literally like
here's the Eureka state and I'm showing
that one thing that they really would
benefit from the most to plant the seeds
for the next call. I can break that down
further. I just say on the last four
minutes, I save generally speaking four
minutes to set up the next step. So, we
can get into what that looks like. But,
I just want to reiterate, I can tell you
this and that. I can do all of these
different things, but at the end of the
day, you have the SVP of cloud from Nike
on a call and he's pouring or she is
pouring their heart out about all of the
problems they're having. I'm just going
to let them go because having a
follow-up call only makes sense. Uh but
that that's kind of how I approach it,
right?
I approach it in a similar structure. I
I really like what you said about
the questioning and just letting them
go. Like, yeah, you can come in with
planned questions, but it's more
important. You want to hear from them.
And I think a lot of people, they don't
even realize this. Questions are very
powerful, but I think reps are
overtrained in question asking and and
not trained enough in bringing a strong
point of view. I call these things
credibility statements. I view that as
part of that first 2 minutes or so. 2 to
5 minutes of the call, depending how
long the small talk goes, but it doesn't
need to be anything fancy, but I like to
share or kick off anywhere from 30
seconds. I'm introducing myself, the
team I'm a part of, the vertical I
support and what we do, but I'm offering
a point of view as to why I set up the
caller, like the types of priorities and
challenges I essentially tend to work on
and the business outcomes we focus on
achieving with customers, but want to
get their feedback from them in an
introduction as well. Like almost
prompting them and giving them ideas
that I don't even have to ask those
questions in the first place to get them
to start sharing pain. I found that if
you come in with a strong point of view
and you say, "Here's what we do. the
types of priorities and challenges we
solve, etc., and you've made it targeted
to their job title, their industry, or
whatever research you've done
beforehand. You're not always going to
be right, but it gets them thinking when
they otherwise we're just going to sit
there and check Slack. They're like,
"Oh, wait. Yeah, we do care about that.
What do you What do you guys do there?"
And that and it gets them to open up
that way. um when you when it comes to
uncovering real pain because that I view
that as I agree the main goal of
discovery call is to latch on to one or
two very specific important pain points
to them that are worth them setting up a
next call and potentially bringing on
another stakeholder. Are there any
tactics you use to to get beyond surface
level answers if if you know in your
head like I actually think we can help
this person. They're just not thinking
about it the right way and they're
giving you bland like all right we're
trying to we're trying to be more
efficient. Yeah. How do you actually get
them to open up and get to that what's
often referred to as second level or or
third level operational or business
pain?
Yeah. And I'm sure here we could talk
about hypotheticals for like an hour
plus. I at the simplest level and I'll
break it down in more detail, but
there's always that kind of saying of
why anything, why now? Why us? Um so I
think you know just always like hey why
do they need to do anything in the first
place? Why would they do that now? Be it
6 to 12 months and then why would they
use us specifically? And that kind of
helps you I would say not that you have
that exact conversation with a prospect
but that's always a good barometer to
like help you craft your questions that
kind of guide them down that structure.
Uh just for reference you know selling
my entire career from a technical sales
perspective I have sold open source
solutions. So they're basically using a
free version and often times we are
competing either what you could argue is
like competing against oursel like them
using the free version but realistically
it's do nothing you know so hey it broke
this one time as an example of many like
selling open source databases it broke
uh is that going to happen again what
happens if that happens again why
haven't you fixed that right there are
different varying degrees of problems
that they've already identified but it's
really an understanding like I another
example comes to mind more recently on
an open source automation platform I
sold where we were working with someone
who had an outage for eight hours
because they were using our free version
on Black Friday. And that that sounds
great. That's a great thing to say, hey,
we've uncovered this pain. But the
reality is that happened one time on
Black Friday. It had not happened since
and it was like the summer. So we're now
6 months beyond when that happened. And
while they feared that it could happen
again, I had to really dive into why
that happened in the first place and
paint a picture of why like they were
not secure. So it's like, hey, they
built processes to try and avoid that.
But if they were moving towards our
enterprise platform, they would have the
ability to actually using technology
ensure that it never happens again. So
even what you'll find is again like I'm
getting too niche, like pull me out if
I'm too deep here.
Yeah, I hope this answers your question
where it's like even though someone will
tell you, "Hey, Connor, we lost, you
know, $800,000 last year because we had
an 8 hour outage on Black Friday." In
this case, the number was significantly
more than that. But they'll say, "Hey,
we've taken," if you actually sit there,
you know, the average rep is going to
say, "Great, like we've uncovered this
pain." Of course, you would want our
enterprise platform. That's what they're
thinking in the back of their mind. But
when you actually dive in, when you are
solving for some of those pains, you
find that even though the company
doesn't have that fully addressed, they
are still taking steps manually, even
though it's duct tape on a broader
problem, they're still going to take a
ton of steps to try and prevent that
from getting worse and worse over time
because their job depends on it. So, if
you take it at, you know, the headline
of, hey, they lost $3 million last year
because of an eight hour outage and they
don't have the ability to protect that
again, that sounds great, but talk to
more of their engineers or talk to that
person individually like, hey, that
sounds horrible. We're 6 months down the
line. What's different now? You know,
and like you have to sit there and
really be competent enough in your own
problem space to know the questions to
ask, but also not let the prospect who
tells you that and says, "Hey, this is
great. I want to see a demo." It's like,
hey, before we get there, I just really
need to understand what you're doing now
and what you've taken because that's
going to impact what I show you in our
platform. So, again, I'm getting super
niche here. I hope that's not like too
far down the rabbit hole, but I think a
lot of people take that stuff for
granted. And to your point, they're
trained on questions. They're not
trained on a holistic 30 minute to 60
minute call and how to guide someone
exactly exactly where you need to be to
uncover the the real significance of of
what you're trying to solve.
Yeah. No, it was good. I'm looking for
the nitty-gritty. Another tactic I'll
give people too to kind of I like your
point about guiding them to where you
think the conversation would be going is
asking contextled questions. So not just
asking the questions you're trained
because when people when reps start
first initially running these calls and
trying to uncover real pain. And I think
a lot I felt this way and a lot of the
feedback we hear from reps is that's
where I start to feel salesy especially
when it's like trying to quantify
business impact like what does that mean
for your business or what would that
mean if we could reduce five tools to
one and then they're like uh that'd be
cool like we'd save a bunch of money. Um
ask like tell them the reason why you're
asking the question. I think that's one
of my favorite lines in sales is the
reason I ask or the I only ask because
like ask the question but then prompt
them or that's why I call them like
contextled questions. Tell them why you
asked like so you're using vendor A for
planning. What are you using for X, Y,
and Z? A lot of reps will just stop
there. What are you using for this? What
are you using for that? And it'll just
feels salesy like you're trying to lead
them somewhere where I'll more ask the
question like what are you using for
XYZ? And I only asked because a lot of
customers we work with who are using
vendor A like your competitor they told
you they were using these other three
vendors and we were able to consolidate
that onto one platform and save them x
amount of money in the process. So I'm
just curious if you thought about that.
That's just like an off-the- cuff
example, but it's a less salesy way of
kind of leading them. Don't make them
don't that's where they feel salesy when
they can tell you're just asking
questions for the sake of ending at some
destination you're hoping. Just don't
hide it. Just tell them why you're
asking the question. It's not salesy.
It's natural and and they start to trust
you more and they can see where you're
going with this. So, those are like
tactical things you can do to actually
start uncovering real pain. I guess
wrapping up here, let's say we focused a
lot on those middle 20 minutes or so,
uncovering the real pain. Let's say the
call goes pretty well. A lot of times
when it goes really well, the next steps
kind of just naturally set themselves
and a lot of times they're the one
asking what next steps are and they make
it easy. That's how you know you really
ran a good call and that there's a
potential good fit here. But what about
those middle ground calls where you
don't see you don't think they're seeing
the vision yet, but you actually think
this is worth pursuing and setting a
next step? How do you go about wrapping
up that call in the last four minutes
and and setting a solidifying a next
step without sounding pushy?
Yeah, it's a great question and and
again here hopefully this just gives you
ideas of things you can do versus the
exact script because exactly to your
point like if I have a lukewarm call
with you, there's interest but I can
tell maybe you're not going to be that
champion for me. I still want to
leverage that into an introduction.
However, let's say the flip side is you
clearly define that you want to get a
trial going and I I can even tell if I
gave you a trial, decent chance you'd be
successful. I have to very carefully
almost pump the brakes and make sure we
have alignment all the way up and down
the org before we get into that trial
and kind of almost test them early on. I
would say a general framework here,
let's say first discovery call, let's
call it like a midsize organization.
you've done a good job articulating it,
but I'm kind of wishy-washy on if you're
going to be the person to take us to the
promised land. I think a good next step
in this scenario is like one, if I show
the demo, it really resonates. They're
like, "Wow, that's great." I might even
put it on them to kind of get a sense
for their experience and also influence
within the organization. And after I
show that like, "Hey, this is great. I
know we've got about four minutes left
here. I have some thoughts on next step,
but I'm curious from your perspective.
What do you think would be a good way to
keep going because we've we've only
breached the surface here? Right. See,
and and honestly that again I might I
may not always do that because to your
point if this is like we're absolutely
killing it. Maybe even in discovery
they're saying, "Hey, my boss Jessica or
whoever is the, you know, has extreme
insight." I I may not even put the ball
in their court because I'll just say,
"Hey, this went really well. Do you
think it would be appropriate on our
next call to bring Jessica in?" As one
example of many, but I'm I'm just going
to go ahead and cut through the noise
and make that ask to go right there.
again if the call is going well.
But honestly, I think you get a very
good sense for hey, uh, you know, I'm
glad it sounds like there's something
here. I'm curious what your thoughts are
on next steps. Another question that I
may ask also is like I may get something
on the calendar. So, hey Connor, we just
breached the surface. I'd love to give
you a more in-depth overview of what we
do. And I know you mentioned, you know,
these two people or the SR team would
have an interest. Do you think we could
get maybe two people from them to come
to our next call? See how they respond
to that? Once that is in place, then
from there, I might ask a question.
Again, I've already I've literally sent
the invite out on the phone. They've
already verbally committed to that next
call. Now, I'm going to take one or two
chances at, you know, what may be a
salesy question, but also for the sake
of like making sure we are, you know,
progressing things forward and not
wasting either party's time. It's like,
hey, I know we have a long way to go
here and I don't want to get over ahead
of myself. We can definitely talk about
this more on the next call, but you
know, I I'm just curious like when you
guys have typically bought solutions
like this before, what does that look
like? Right? I may take a shot on that.
That's like the highest level general
question, but I may get a feel for or
try to understand, hey, you know, I know
right now you want to demo and I think
we can definitely get there. Our team is
going to need a few people involved in
that process just for my reference to
again, I know we've got a long way to
go, but you mentioned director, Sally,
Jane, or whoever. Is that who would
ultimately sign off? Like those are
examples of questions. Again, once I've
actually sent the invite, they've
verbally agreed to that next step. I'm
going to make sure I get at least
someone else on that call or at least
make that ask very clear. And then also,
I'm going to take one or two chances on
trying to understand their buying
process and or ideally who would
ultimately sign off so I can start
working backwards down the line. But
again, those are all examples. That's
not the golden script. To your point,
I'm going to dial that up or down based
on how the call went. Curious your
thoughts on that or any other context
you have as well.
No, I think that's a great overview. I
mean, I like to get the next step
solidified if I haven't disqualified and
I think this is worth pursuing. I
honestly tend to just recommend next
steps and I don't even like to open it
up to them to to get I'll I'll recommend
it and then get their thoughts. I don't
like to even ask for their thoughts
first and and give them the chance for
an out. I just like to I'm the one who
works in the space every day. I know how
software is bought. I have an idea of
what I think based on the conversation
the next step should be and recommend
that to them and then of course open it
to them to get confirmation that they
agree. Um and then get that sent out
accepted and then that's when I agree
you can start asking some of those other
buying decision type questions now that
they've agreed that a next step is worth
it here. So but I don't think people
need to over over complicate that. A lot
of times when you run an effective call
the na the next steps kind of naturally
set themselves and you don't face much
resistance. So
yeah and and I mean again there's yeah
there's so many general examples here
but I I also think to your point it's
like if I'm talking to an individual
engineer and I'm curious like hey you
know I I may ask about their buying
process to see if they've actually done
this before because I'm sure you've
experienced this and regardless of if
it's engineers are any different
persona. There's a lot of people that
want to look good. they want to show off
to their boss or they're finally taking
their career more seriously and want to
promote and they just kind of go rogue
and you know fill out a demo request on
behalf of the entire SR team but they've
actually never done this before. So
again to your point I totally agree like
maybe it's clear they have influence or
maybe you're even further up the chain
you have a director on the call setting
those next steps and not even giving
them that opportunity is a great way as
well. So again the the point being is I
think it depends. So, which hopefully
isn't a pop out answer.
And then one one final detail too, and I
know you made a GPT specifically for
this in AI sales accelerator, but is
that follow-up kind of recap email if
you've set a next step. Just this is
part of what goes into building that
trust and credibility that you're
someone who's worth spending more time
with is that within 30 minutes to an
hour, ideally after the call, send them
a detailed again GP chat GPT makes this
a lot easier now than it used to be.
That used to be one of my least favorite
parts. If you're still doing that
manually, you're just wasting your time.
You shouldn't be. Um, but that's one of
those things where it's like they get
off the call, they're like, "That went
well." But then they go back to their
day-to-day, but then they see your recap
message. That's making it really easy to
share with your internal peers and look
professional and it does a good job of
actually recapping what they're focused
on internally or the pain points he
shared, they'll be like, "All right,
this person's on the ball." Like, that's
what they're thinking in their head. And
it just increases the likelihood that
they invest more into those next calls.
and and bringing in other stakeholders
and other things that you'll you'll
ultimately need them to do to lead to a
closed deal. So,
definitely
just uh appreciate you sharing this. I
think this is it's on a lot of reps
minds. We have a lot of STR content on
both of our channels and a lot of them
use that and they promote to account
executive, but then this is a whole new
game once you get into actually running
these calls yourself and you're not
just, you know, kicking off the the
intro and passing it over to AE. like
now it's now it's on it's on you to run
an effective call. So I don't know if
there's any final thoughts you have but
otherwise appreciate you coming on to
share your framework with the audience
here.
Totally. Yeah. I mean you know it's on
you I think first and foremost to
understand your problem space like we
talked about your product etc etc. But
again all of this is a framework but
also again keep in mind like hopefully
you've been in sales long enough to
understand like you don't have to have
the answers either. I I don't want to,
you know, it's easy for us to sit here
and riff all day on what we would do,
how we would handle this situation.
There's still very many times where
we'll run into never having, you know,
experienced this question or this
scenario before. But also, if you've
actually done that work, you actually
understand your product, your company,
your problem space, etc., then your
questions are genuinely curious about, I
have never seen this before. What would
this be? So, I just want to call that
out. It's always easy for us to be on a
podcast here and make it sound super
simple. That's never the intention.
Hopefully this equipped you with again
more a framework, different tools you
can pull out at the right time. And uh
yeah, Connor, thanks for having me on
again, man. Always uh always a pleasure.
Well said.

---

## Discovery Call Structure That Turns Cold Leads into Closed Business [Template w/ Questions]

Source: https://www.youtube.com/watch?v=2fYXkQGfskc

- Last Monday we talked a little
bit about the sales trainer
we hired and how we're evolving as a sales team
and we got a lot of requests for people
that wanted to see our closing questions
or the way that we
structured our sales calls.
So today I'm gonna run through our entire
discovery call structure, how
we structure call number one
to turn our cold leads into
actual closed business.
So let's jump into it.
At the end of this video
I will point you towards
this doc, you can download this whole doc
but we'll run through it first.
So here we go.
The discovery call in terms of structure
is the call that comes
after the cold email.
So this is the call that
you're trying to book
on those initial cold emails
and the goal of this call
is to try to progress the deal, right?
Get a budget, figure out if
it's the right decision maker,
figure out if there's actually
a need for your service,
and try to get them to the proposal stage.
So we start with
introductions on this call,
going back and forth, asking who they are.
Usually this ends up in us
talking about the weather
or sports, Billy is very into sports
so that helps a lot actually.
I'm not too into sports so I
don't usually talk about that.
Then we move into our
short value proposition
which is basically who our company is,
what we do, all of that.
If you watch the talk that I gave,
it's like a 49 minute talk
about the four strategies
that brought in all these
leads for agency clients.
I actually go through that in more detail.
And then we jump into the part
that I really want to cover
in this video which are
our discovery questions.
So here are the discovery questions
that we ask on our discovery calls.
First we start off by
asking, can you tell me
about your organization and
your role within the company?
This usually gets them talking.
If they don't want to talk too much
we have some sub-questions so,
what's your main value proposition?
Who are your customers?
What type of products and
services do you offer?
What type of work do
you personally oversee?
Who are the other major
players in the company?
So we can ask some follow
up questions around there.
A lot of this we'll be researching
before we hop on the call.
Right, figuring out what their business is
or what their role is, it's
good to research beforehand.
But it's also good to ask these questions
and get them to confirm a lot of research
because it's easy to
make assumptions based on
research that end up
being completely false
once you hop on the call itself.
Once we get a good idea of who they are
within the organization
and what the company does,
then we move into, what areas
of growth are you focusing on?
We're a marketing company,
obviously growth is huge for us.
For mobile app development companies
or for some other company,
it would be a question
more focused on that.
A more general way of
asking this question are,
what are your goals for
the company for 2017?
Or, what are your goals
for technology for 2017?
Something around those lines
that will get them talking
about whatever it is
you're trying to sell them on.
Then we dig deeper so,
tell me about how you get
some of your best opportunities now.
These are all again marketing questions,
very marketing specific content here.
So where do these leads come from?
What stage are they in?
What do your best prospect
customers have in common?
Basically getting them to outline,
if we were to work together,
what would this target look like?
In a mobile app development
call, this would be talking
in more depth about app ideas they have,
tech stacks they use, how
their tech team is structured,
things like that, but
since this is marketing,
we're focusing more on
marketing lead generation here.
Then we look to confirm.
So you're looking for more of these leads
and opportunities I assume?
Get them to say yes.
And then a lot of the time,
once you get to this point
in the call, they'll
have a pretty good idea
of how you guys work and how
they want to work together.
Then we ask something like,
when we reached out to you,
can you tell me what came
to mind about how we might
be able to work together?
Or, when you responded
to the email I sent,
could you tell me a little bit more
about how you thought
of us working together?
Then we take all of the data
from previous part of the call
and we retell our value proposition.
For X27 it would be something
like if they're talking
about the type of leads that they want
or inbound, or literally whatever it is,
we'll restate something like that.
So let's say they get most
of their leads from inbound,
we'll say something like,
you know most of our
agency clients also get most
of their leads from inbound,
what I found though is you can't really
rely on inbound too much
because it's a lot of luck.
Right, you can't really
scale inbound channels
without finding certain ways to grow
and get new cornerstone clients.
So that's where outbound comes in.
So that's how we reframe.
In the app development space it might be,
you know, they point out that they build
most of their stuff in PHP.
And you could say something like,
yeah we've got a full
suite of PHP developers
and one of the biggest issues we find
when people are running a PHP team is,
you know, this, whatever
you do actually find.
And then asking them to reconfirm that.
Right, pointing out some
issue that they might have
based on your experience.
Then we transition the call
with a statement like this so,
from what I'm hearing it
sounds like we might be
a pretty good fit to work together.
I'd love to actually share some examples
of companies similar to yours
that we've helped in the past.
Does that sound good?
And then if they say yes, you could move
to the closing part of the call.
We say something like,
okay so let's do this.
I'm gonna put together some materials
that I'd like to share
and review with you.
And I'd like to work through
a marketing overview strategy
that we can both agree on.
The goal is to take them from this initial
discovery call where you get the budget
and you identify the
need, to the next call
where you're actually
presenting solutions to them.
Same with mobile app development,
same with web development
and branding UX UI.
I know there's this anti-spec work mindset
that a lot of agencies have.
The design team, the
development team doesn't
actually have to be
brought in in this phase.
In my experience, the
sales guy, if he's been
working close with
designers and developers,
is usually able to get
to this point by himself.
Or is usually able to at least
come up with enough ideas
by himself to get them here.
So then we suggest
setting up a screen share
where we discuss our
tactics and get their input,
questions about each one
so that we can come out
with a specific plan.
That way we both know exactly how we can
potentially work together.
Ask them if it sounds good.
When they say yes, we say,
hey let's book some time.
How does Tuesday at
3:00 p.m. central sound?
Then we send the invite,
ask if they have any
other questions and that's
the end of the discovery call.
From there we move on to a
proposal presentation call
which I can discuss in a future video.
If there's interest, let me know
and I can go through that as well.
Thanks for watching the video.
Feel free to like it to
encourage this type of content.
Subscribe for more B2B sales training.
And if you need marketing
support for your digital agency,
check out experiment27.com
Thanks.

---

## Video 6

Source: https://www.youtube.com/watch?v=V5jjzJkQ5Yw

No transcript available.

---

## How to Weed Out Bad Clients – 9 Discovery Call Questions

Source: https://www.youtube.com/watch?v=SE0T0QGD1Oc

do you want to find better buyers and
weed out all of the crappy leads that
are wasting your time then be sure to
ask the nine qualification questions
that we're going to cover in this very
video on your next Discovery call each
one of these questions falls into one of
eight different sections of what I call
the diagnosis call Process they are
uncovering pain time frames confirming
fit calculating Roi understanding the
buying process agreeing budget
identifying the champion and then
getting agreement from the buyer now
these diagnosis CA this process that I
teach over at sales.com in sales.com
academy and in the free book which you
can find over at sales.com selling Made
Simple do something slightly different
than the traditional diagnosis call what
a diagnosis call does that a typical
Discovery call doesn't is that it covers
both Discovery but also qualification
product positioning micro closing and it
aligns you up to ask for the close in
one call rather than doing this over
multiple multiple different engagements
with a prospect you can learn more about
all of this in the the free book that
you can get over sales.com but now let's
get into the questions themselves so the
very first category of questions you
need to be asking during your
qualification calls is probably the most
important and this is uncovering pain so
does your prospect actually have a
problem and are they in enough pain to
drive the amount of urgency that's
needed to help them make a purchase
decision you essentially need a yes to
both of these questions that we're going
to cover a yes to both of these
variables is downright necessary and to
get to the bottom of it you can ask
these two questions you booked in this
call with me today what led you to
getting this call booked in you're
trying to understand what is the main
reason that they're talking with you
right now and of course after asking
this question you can have to do a
little bit more digging but even the
most tight lipped of buyers are still
going to give you a kernel of Truth in a
response to that question and the second
question you need to ask is what
stopping you from solving this issue
yourself and this is one of my absolute
favorite follow-up questions to the
previous question that we just went
through not only does this question
uncover any roblo implementation that
you may hit further down the road but
also gives you a clear idea of how big
the problem is is for the buyer because
if this really was a big problem the
buyer should have been working to try
and solve it themselves and now they
come to you because they can't get it
done and that leads us on to the next
category of questions and that is time
frames now not all time frames are going
to line up and this should be one of
your chief concerns when trying to
qualify whether a prospect's timeline of
getting a product or service bought and
implemented matches your own when do
they want this problem solve today this
quarter 15 years from now who knows and
as a general rule of form the buyers
want to work with should be the ones
that want to solve their problems
quickly because if they don't have that
urgency they're not going to be
compelled to act and that's going to
mean feet dragging they're going to not
show up to meetings they're going to
ghost your email messages and it's going
to be complete waste of your time so
make sure to ask the question when does
this issue need to be solved by this is
straightforward it's a it's a no
timeline question that you can
use to assess whether your time frame
matches up with the prospects time frame
the next section of the call we need to
cover is confirming the fit and for this
category of questions you need to ask
this to yourself rather than ask it to
the buyer ask yourself the question do I
actually have the solution for this
buyer's problem and honesty is key here
the best performing Reps don't oversell
their products capabilities why because
a dissatisfied customer becomes a pain
in the ass they're never going to upsell
they're never going to convert into
bigger larger more exciting deals
they're never going to give you
referrals and they're just going to pest
you and annoy you and become a customer
service nightmare so think long and hard
about whether you can actually solve the
problem that the buyer has it's a it's a
question that you shouldn't have to ask
yourself this should come naturally
organically but in the modern world of
btb sales it's something that is
valuable to implement for a lot of
sellers then the next category is
calculating the ROI of the problem that
you can solve because no matter how big
or small every new solution is going to
take a little bit of effort for the
buyer to implement buyers need to change
vendors hire new staff train the team on
a novel new system they need to fight or
gather or change the budget this is all
a little bit of Hassle and pressure and
stress before they ever get to the value
that your product offers them the
question your buyers asking themselves
is is the value that your solution
offers over the medium to long term
worth this initial discomfort how much
are they going to have to change to
accommodate it and when all is said and
done are they going to look back on this
investment of time energy resources as a
good one or a a negative one so you
don't want them to do this on their own
you want to help them through that
process of uncovering the ROI of working
with you medium to longterm on your
diagnosis call or your Discovery call
then obviously you can nudge them one
where over if they start going off the
rails off the wrong tracks as to the ROI
that's going to be delivered so we're
going to ask the question how would
things be different if we solved this
for you we want to uncover what's
actually going to change for the buyer
once they Implement Your solution is it
a simple quality of life difference or
does it lead to a real change for the
fundamentals of the business long term
it's one thing for you to say that the
ROI is X whether that be Revenue dollars
time saved it's quite enough for the
buyer to turn around and say ah no
actually what I'm going to get is this
and I value that more you want to get
the ROI calculation coming from the
buyer so then you can document it down
and you can share it repeatedly
throughout the sales process if you ever
fall into any friction or any issues and
this one is key because no matter how
well you think that you know your
industry the the buyers within it well
every business is going to be different
and again the buyer might give you the
Roi in a different way than what you've
communicated it to them and we always
want to speak in the language that the
buyer communicates in that's our job
after that comes understanding the
buyer's process so we've got to be sure
that your buyer is willing to adapt to
your selling process and that you
understand the buying process so that
you can go through it seamlessly and
rapidly and to get to the bottom of all
this you just ask the question when your
organization has done similar projects
to this in the past what processes need
to be put in place what buying process
needs to happen to get this product or
service implemented and this question is
going to give you a real clear idea of
what lies ahead for both you and the
buyer for you to get this product or
service implemented so that they can see
the value that we're pitching them in
all of these points of communication
it'll help you understand how much work
you're going to have to do to get the
team trained up to speak to that
procurement individual who seemingly is
a massive pain in the ass to do the
paperwork to get the budget all of the
prerequisite steps that you need to get
a deal done it's far better to
understand these steps of the Buy's
Journey at the top of the process then
find out halfway through that there's 15
more people that you need to engage with
and that leads us on to the money side
of things the next step of the process
which is agreeing budget and as
experiment 27 founder Alex Burman told
me in a recent interview so I just
searched like best do best SEO Lawrence
Kansas and there was like a list of 10
and I filled out the contact info on all
10 and then whoever called me first and
I I I worked with like whatever the
third guy I think was that called me so
it's like that's what your buyer are
dealing with if they have budget and
they're ready to buy it's very easy to
close them for whatever reason I think
this is a an issue with people having
weird beliefs and psychology about money
but with that said it is the reality
that we live in talking about budget can
be a touchy subject with some people
which is why you may want to avoid
talking about budget until later in the
sales process but that is dumb you need
to be 100% clear whether the prospect
has the funds to pay for your solution
at the top of the sales process
otherwise what are we what are we doing
here we're just having a bunch of
conversations with people that are never
going to be able to give us Revenue it's
not a good use of your time as an
individual contributor who wants to make
some money via commissions it's also not
a good use of your company's time
speaking to randomers that are never
going to make a purchase so with this
being for some people a touchy subject a
good way to frame this up and a good
question to ask is how are projects like
this typically funded so we're not being
direct to someone's face unless unless
you feel it's appropriate to do so I
will ask ask this question more times
than not but we're not necessarily
asking the question do you have the ,000
to get this over the line the question
of how projects like this usually funded
is a softer way to start those budget
conversations with this open-ended
question you're going to get a better
idea of how many Hoops your buyers going
to have to jump through to get proper
funding and also if you listen to the
answer and if you listen to the
subtleties within it you're going to
have a better idea if they are the final
decision maker or if you're going to
have to Loop in a different department
head and executive or whoever it is
before the final yes or no decision can
be made so only a couple more questions
and a couple more sections of a
diagnosis call that we need to get
through here the next one is identifying
the champion within the account now your
buyer's decision is going to be
influenced by a number of individuals
within the business it could be a head
of Department a higher up in the sea
Suite even an influential team member or
end user of the product or service
that's why it's important to figure out
who those individuals are and if they
are positive to our cause we call them
champion and as a side note here if
you're doing large complex B2B deals and
there are seemingly no Champions no one
who is shouting your Praises internally
even at the top of the sales process as
you go through this diagnosis call with
the prospect then the buyer's probably
Price shopping you they're probably not
that interested they're probably just
gathering information or you're not
dealing with the person who's actually
going to make the decision you're
dealing with someone who's 15 Steps
below them who is never going to make
the decision and they're just again
gathering information to pass it up to
the actual decision maker themselves so
listen carefully as you ask the question
if you were to make a purchase decision
who else would help with that process
and this question is formulated again
subtly that if you aren't dealing with
the end decision maker and you need to
be dealing with them you're not going to
piss off the person you're asking the
question too you're not going to Dent
the ego too much because after all no
one likes to feel like they're not in
charge no one wants to be the
during the buying process even if that's
what they actually are and then finally
the last section of your diagnosis call
is getting agreement and this is up to
you to get a verbal commitment on this
call otherwise it's been a waste of
everyone's time otherwise the buyer is
liable to walk away after weeks or even
months of your hard work you have to get
verbal commitments I call it micr
closing again we cover micr closing in
the book selling Made Simple which you
can find over sing.com completely for
free we cover it on this YouTube channel
as well right but micr closing
throughout the entirety of the sales
process from call to call from from
conver ation to conversation is
absolutely essential to getting complex
B2B sales done so towards the end of the
diagnosis call we're going to ask the
question you're a good fit to work of us
so start of a statement if we can solve
x will you commit to Y so we're not
necessarily saying you're a good fit to
work with us over sales.com Academy with
our sales training program if I can help
you to extra Revenue this year will you
commit to getting started today if
you're selling to an individual or a
small business owner that might be an
absolutely appropriate question to ask
but typically if you're doing larger
complex B2B deals where there's multiple
decision makers there's multiple
stakeholders what you're trying to do
here is get the next step of the process
booked in the diary so if I can help you
solve x will you get Barry on a quick
call next week will you send me this bit
of information that I need just to
confirm the RI that we can generate if I
do this will you do that we absolutely
need a micro close like this towards the
end of every single call that we do
never mind just the diagnosis calls that
we're running through in this video so
there you have it n probing questions
that you should be asking in every
single one of your Discovery calls or as
we teach over sell.com Academy your
diagnosis calls and if you ask each one
of these questions you're going to have
all the Intel that you need to know to
qualify whether the prospect you're
speaking to is a picture perfect fit or
a gross fish that you don't want to eat
and you should throw back into this and
if you enjoyed this video why not click
the video that's on the screen right now
and continue making selling simple

---
