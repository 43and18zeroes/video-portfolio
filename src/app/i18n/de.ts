// de.ts

/*
 * German is the source of truth. `Dictionary` is derived from this object, so
 * every other language file is checked against it at compile time: a missing key
 * fails with TS2741, an extra one with TS2353. Do not add `as const` here — it
 * would narrow the values to string literals and force every translation to be
 * character-identical to the German one.
 *
 * Parameterised copy is written as a function, so the argument types, the argument
 * count and the return type are checked too. The one thing the compiler cannot do
 * is force a translation to actually interpolate every value it was handed -
 * dropping a trailing parameter is legal TypeScript. There is exactly one such
 * entry (gallery.bulletLabel), so that stays a review item, not a systemic hole.
 */
export const de = {
  meta: {
    description:
      'CMW Media – Videoschnitt und Thumbnail-Design für YouTube, Shortform und Social Media. ' +
      'Schnitt, Motion Design und Thumbnails aus einer Hand.',
  },

  header: {
    videos: 'Videos',
    about: 'Über mich',
    contact: 'Kontakt',
    /* Names the target language, so it reads as the action the button performs.
       The button also carries lang="en" so screen readers pronounce it correctly. */
    switchLanguage: 'Switch to English',
  },

  hero: {
    heading: 'Mehr als nur aneinandergereihte Clips',
  },

  videoSample: {
    heading: 'Mehr als nur aneinandergereihte Clips',
  },

  testimonials: {
    hero: {
      text: 'Absoluter Experte. Der Schnitt war on-point und die Kommunikation lief reibungslos.',
      author: 'Jane Doe',
    },
    sample: {
      text: 'Absoluter Experte. Der Schnitt war on-point...',
      author: 'Kunde / Creator',
    },
  },

  gallery: {
    heading: 'Thumbnails, die Klicks bringen',
    pickerLabel: 'Thumbnail auswählen',
    bulletLabel: (index: number, total: number) => `Thumbnail ${index} von ${total}`,
    /* Keyed rather than an array: TypeScript checks object keys but not tuple
       length, so a list would let the two languages drift apart in size. */
    thumbnails: {
      powerbank: {
        alt: 'Tech-Review-Thumbnail: Powerbank mit 100-Prozent-Ladeanzeige, Titel „Neu Test"',
        ctr: '+14.8% CTR',
      },
      scaling: {
        alt: 'Business-Thumbnail: Unternehmer vor nächtlicher Skyline, Titel „Skaliert"',
        ctr: '+18.2% CTR',
      },
      dayOne: {
        alt: 'Challenge-Thumbnail: Person mit erhobenen Armen über der Stadt, Titel „Tag 1"',
        ctr: '+12.5% CTR',
      },
      tutorial: {
        alt: 'Tutorial-Thumbnail: Code-Editor mit HTML-Datei, Titel „Tutorial"',
        ctr: '+16.0% CTR',
      },
      noLimits: {
        alt: 'Fitness-Thumbnail: Hanteln und Kettlebell im abgedunkelten Gym, Titel „No Limits"',
        ctr: '+15.3% CTR',
      },
    },
  },

  numbers: {
    heading: 'Zahlen, die für sich sprechen',
    stats: {
      views: {
        suffix: ' Mio.',
        spokenPrefix: 'über',
        spokenSuffix: 'Millionen',
        label: 'generierte Views',
      },
      retention: {
        suffix: '%',
        spokenPrefix: 'plus',
        spokenSuffix: 'Prozent',
        label: 'höhere Retention',
      },
      turnaround: {
        suffix: 'h',
        spokenPrefix: 'unter',
        spokenSuffix: 'Stunden',
        label: 'durchschnittliche Bearbeitungszeit',
      },
    },
  },

  about: {
    heading: 'Hi, ich bin Christoph.',
    lead:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ' +
      'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    body:
      'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea ' +
      'takimata sanctus est Lorem ipsum dolor sit amet.',
    portraitAlt: 'Illustration von Christoph, der eine schwebende Videoschnitt-Timeline bedient',
    techLabel: 'Eingesetzte Software und Plattformen',
  },

  contactForm: {
    heading: 'Schnellanfrage',
    subline: 'In 30 Sekunden ausgefüllt - Antwort innerhalb 24 Stunden.',
    success: {
      title: 'Vielen Dank!',
      text: 'Die Anfrage wurde erfolgreich übermittelt.',
    },
    error: {
      title: 'Fehler beim Senden!',
      text: 'Die Nachricht konnte nicht übermittelt werden. Bitte erneut versuchen.',
    },
    name: {
      label: 'Name',
      placeholder: 'Name',
      required: 'Bitte einen Namen eingeben.',
      minLength: 'Der Name muss mindestens 2 Zeichen lang sein.',
    },
    email: {
      label: 'E-Mail',
      placeholder: 'E-Mail',
      invalid: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    },
    topic: {
      label: 'Art des Projekts',
      placeholder: 'Art des Projekts',
      required: 'Bitte eine Projektart auswählen.',
      /* The submitted values stay German keys in contact-form.ts — only these
         labels are localised, so the mail endpoint keeps receiving what it expects. */
      options: {
        youtube: 'YouTube',
        shortform: 'Shortform',
        other: 'Sonstiges',
      },
    },
    submit: 'Projektanfrage starten',
    submitting: 'Wird gesendet...',
    or: 'oder',
    mailCta: 'Lieber direkt per Mail?',
  },

  video: {
    consentNote: 'Beim Abspielen werden Daten an YouTube übermittelt. Siehe',
    privacyLink: 'Datenschutzerklärung',
    play: 'Abspielen',
    playerTitle: 'YouTube video player',
  },

  footer: {
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
  },

  drawer: {
    close: 'Schließen',
    loading: 'Lade Inhalt...',
    /* Only rendered while English is active — a German reader is already looking
       at the German original. The key exists here to keep the two files symmetric. */
    germanOnly: 'Impressum und Datenschutzerklärung stehen nur auf Deutsch zur Verfügung.',
  },
};

export type Dictionary = typeof de;
