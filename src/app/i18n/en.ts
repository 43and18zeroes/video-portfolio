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
    heading: 'More than clips stitched together',
  },

  testimonials: {
    hero: {
      text: 'A true professional. The edit was on point and communication was effortless.',
      author: 'Jane Doe',
    },
    sample: {
      text: 'A true professional. The edit was on point...',
      author: 'Client / Creator',
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
    lead:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ' +
      'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    body:
      'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea ' +
      'takimata sanctus est Lorem ipsum dolor sit amet.',
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
      options: {
        youtube: 'YouTube',
        shortform: 'Short-form',
        other: 'Other',
      },
    },
    submit: 'Start your project',
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
    imprint: 'Legal notice',
    privacy: 'Privacy policy',
  },

  drawer: {
    close: 'Close',
    loading: 'Loading...',
    germanOnly:
      'Legal notice and privacy policy are available in German only. ' +
      'The German version is the legally binding one.',
  },
};
