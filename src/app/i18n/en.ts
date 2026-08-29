// en.ts

import type { Dictionary } from './de';

/*
 * Typed against the German dictionary: `ng build` fails on a missing key (TS2741),
 * an extra or misspelled one (TS2353), and on a parameterised entry whose argument
 * types, argument count or return type differ (TS2322). Leaving a trailing
 * parameter off is the one case TypeScript permits, so check that any function
 * entry here still uses all the values it is given.
 *
 * The lorem ipsum in `about` is placeholder text in both languages and is left
 * identical on purpose.
 */
export const en: Dictionary = {
  meta: {
    description:
      'CMW Media – video editing and thumbnail design for YouTube, short-form and social media. ' +
      'Editing, motion design and thumbnails from a single source.',
  },

  header: {
    videos: 'Videos',
    about: 'About',
    contact: 'Contact',
    switchLanguage: 'Auf Deutsch wechseln',
  },

  hero: {
    heading: 'More than clips stitched together',
  },

  videoSample: {
    attention: 'Editing that keeps people watching',
    intent: 'Every cut has a reason',
  },

  /* PLACEHOLDER — see the note in de.ts. Nothing here is a real quote. */
  testimonials: {
    hero: {
      text: 'PLACEHOLDER — a real client quote goes here later.',
      author: '[Client name], [Role], [Company]',
    },
    sample: {
      text: 'PLACEHOLDER — a real client quote goes here later.',
      author: '[Client name], [Role], [Company]',
    },
  },

  gallery: {
    heading: 'Thumbnails that earn the click',
    pickerLabel: 'Select thumbnail',
    bulletLabel: (index: number, total: number) => `Thumbnail ${index} of ${total}`,
    /* The headlines quoted in these descriptions are burnt into the images and
       stay German — the alt text describes what is actually on screen. */
    thumbnails: {
      powerbank: {
        alt: 'Tech review thumbnail: power bank showing a full charge, headline „Neu Test"',
        ctr: '+14.8% CTR',
      },
      scaling: {
        alt: 'Business thumbnail: entrepreneur in front of a night skyline, headline „Skaliert"',
        ctr: '+18.2% CTR',
      },
      dayOne: {
        alt: 'Challenge thumbnail: person with raised arms above the city, headline „Tag 1"',
        ctr: '+12.5% CTR',
      },
      tutorial: {
        alt: 'Tutorial thumbnail: code editor with an HTML file, headline „Tutorial"',
        ctr: '+16.0% CTR',
      },
      noLimits: {
        alt: 'Fitness thumbnail: dumbbells and a kettlebell in a darkened gym, headline „No Limits"',
        ctr: '+15.3% CTR',
      },
    },
  },

  numbers: {
    heading: 'Numbers that speak for themselves',
    stats: {
      views: {
        suffix: 'M',
        spokenPrefix: 'more than',
        spokenSuffix: 'million',
        label: 'views generated',
      },
      retention: {
        suffix: '%',
        spokenPrefix: 'plus',
        spokenSuffix: 'percent',
        label: 'higher retention',
      },
      turnaround: {
        suffix: 'h',
        spokenPrefix: 'under',
        spokenSuffix: 'hours',
        label: 'average turnaround time',
      },
    },
  },

  about: {
    heading: "Hi, I'm Christoph.",
    lead: 'I edit video – and design the thumbnails that go with it.',
    body:
      'I work in Premiere Pro and After Effects, and build thumbnails and graphics in Photoshop. ' +
      'But the tool matters less than whether people keep watching: where the cut lands, when the ' +
      'next beat arrives, what can go.',
    portraitAlt: 'Illustration of Christoph working a floating video editing timeline',
    techLabel: 'Software and platforms used',
  },

  contactForm: {
    heading: 'Quick inquiry',
    subline: 'Takes 30 seconds - answer within 24 hours.',
    success: {
      title: 'Thank you!',
      text: 'Your request has been sent.',
    },
    error: {
      title: 'Sending failed!',
      text: 'The message could not be sent. Please try again.',
    },
    name: {
      label: 'Name',
      placeholder: 'Name',
      required: 'Please enter a name.',
      minLength: 'The name must be at least 2 characters long.',
    },
    email: {
      label: 'Email',
      placeholder: 'Email',
      invalid: 'Please enter a valid email address.',
    },
    topic: {
      label: 'Project type',
      placeholder: 'Project type',
      required: 'Please select a project type.',
      /* The three format names are proper nouns and stay as they are in German */
      options: {
        youtube: 'YouTube video (long-form)',
        shortform: 'Shorts, Reels & TikToks',
        other: 'Something else',
      },
    },
    submit: 'Send an inquiry',
    submitting: 'Sending...',
    or: 'or',
    mailCta: 'Prefer email?',
  },

  video: {
    consentNote: 'Playing this video sends data to YouTube. See the',
    privacyLink: 'privacy policy',
    play: 'Play video',
    playerTitle: 'YouTube video player',
  },

  footer: {
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
  },

  drawer: {
    close: 'Close',
    loading: 'Loading...',
    germanOnly:
      'Legal notice and privacy policy are available in German only.',
  },
};
