import type { SupportedLocale } from "../../shared/i18n";

export const SITE = {
  name: "Happy Tours",
  tagline: {
    en: "Fishing adventures and sunset cruises in Corfu",
    el: "Ψάρεμα και θαλάσσιες αποδράσεις στην Κέρκυρα",
  },
  description: {
    en: "Daily boat tours from Kavos to the Blue Lagoon, Paxos, and hidden Ionian gems with a relaxed local crew.",
    el: "Καθημερινές θαλάσσιες εκδρομές από τον Κάβο προς τη Γαλάζια Λιμνοθάλασσα, τους Παξούς και κρυμμένα διαμάντια του Ιονίου.",
  },
  url: "https://www.happytours.gr",
  phone: "+30 698 171 2060",
  phoneRaw: "+306981712060",
  email: "happytourscfu@gmail.com",
  location: {
    en: "Kavos, Corfu, Greece",
    el: "Κάβος, Κέρκυρα, Ελλάδα",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d742!2d20.1081247!3d39.3893406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135c9b9d0d9aed27%3A0xc5a80e5d463d3a4!2sHappy%20Tours%20Kavos!5e0!3m2!1sen!2sgr",
  socials: {
    instagram: "https://www.instagram.com/happytourskavos/",
    facebook: "https://www.facebook.com/groups/610540991023965/",
    googleMaps: "https://maps.app.goo.gl/RkGxxXjnHXqrqBJU6",
  },
  coordinates: {
    latitude: 39.3893406,
    longitude: 20.1081247,
  },
};

type Highlight = {
  icon: string;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type GalleryItem = {
  src: string;
  alt: string;
};

type AboutContent = {
  paragraphs: string[];
  reasons: Highlight[];
};

type TransferContent = {
  overview: string[];
  services: Highlight[];
  coverage: string[];
  note: string;
  inquiryOptions: string[];
};

export const HOME_HIGHLIGHTS: Record<SupportedLocale, Highlight[]> = {
  en: [
    {
      icon: "mdi-fish",
      title: "Fishing on every route",
      description: "All tours include time to fish, with gear available on board and guidance from the captain.",
    },
    {
      icon: "mdi-glass-cocktail",
      title: "Relaxed hospitality",
      description: "Drinks, swim stops, and small groups make the whole day feel easy and personal.",
    },
    {
      icon: "mdi-waves",
      title: "Hidden Ionian spots",
      description: "We focus on crystal-clear coves, caves, beaches, and scenic coastlines you remember long after the trip.",
    },
  ],
  el: [
    {
      icon: "mdi-fish",
      title: "Ψάρεμα σε κάθε διαδρομή",
      description: "Όλες οι εκδρομές περιλαμβάνουν χρόνο για ψάρεμα με εξοπλισμό στο σκάφος και καθοδήγηση από τον καπετάνιο.",
    },
    {
      icon: "mdi-glass-cocktail",
      title: "Χαλαρή φιλοξενία",
      description: "Ποτά, στάσεις για μπάνιο και μικρές ομάδες κάνουν όλη την εμπειρία άνετη και προσωπική.",
    },
    {
      icon: "mdi-waves",
      title: "Κρυμμένα σημεία του Ιονίου",
      description: "Εστιάζουμε σε κρυστάλλινους όρμους, σπηλιές, παραλίες και ακτογραμμές που μένουν αξέχαστες.",
    },
  ],
};

export const ABOUT_CONTENT: Record<SupportedLocale, AboutContent> = {
  en: {
    paragraphs: [
      "Born and raised around the Ionian Sea, we built Happy Tours to share Corfu the way locals experience it: small groups, real hospitality, and time to slow down on the water.",
      "We are not interested in running crowded trips. We keep the atmosphere personal so every guest can fish, swim, explore caves, and enjoy the coast with space to breathe.",
    ],
    reasons: [
      {
        icon: "mdi-compass-outline",
        title: "Local route knowledge",
        description: "We know the coastline, the calmer water, and the stops that make each route feel special.",
      },
      {
        icon: "mdi-account-group-outline",
        title: "Small-group energy",
        description: "The boat never feels anonymous. Guests get a relaxed and friendly experience from start to finish.",
      },
      {
        icon: "mdi-star-four-points-outline",
        title: "Memorable, not rushed",
        description: "We balance sightseeing, fishing, swimming, and downtime so the day never feels overpacked.",
      },
    ],
  },
  el: {
    paragraphs: [
      "Μεγαλώσαμε δίπλα στο Ιόνιο και δημιουργήσαμε τη Happy Tours για να μοιραστούμε την Κέρκυρα όπως τη ζουν οι ντόπιοι: μικρές ομάδες, αληθινή φιλοξενία και χρόνος να απολαύσεις τη θάλασσα.",
      "Δεν μας ενδιαφέρουν οι γεμάτες, απρόσωπες εκδρομές. Κρατάμε την εμπειρία προσωπική ώστε κάθε επισκέπτης να ψαρέψει, να κολυμπήσει, να εξερευνήσει σπηλιές και να χαρεί την ακτογραμμή με άνεση.",
    ],
    reasons: [
      {
        icon: "mdi-compass-outline",
        title: "Τοπική γνώση της διαδρομής",
        description: "Γνωρίζουμε την ακτογραμμή, τα ήρεμα νερά και τις στάσεις που κάνουν κάθε εκδρομή ξεχωριστή.",
      },
      {
        icon: "mdi-account-group-outline",
        title: "Μικρές ομάδες",
        description: "Το σκάφος δεν γίνεται ποτέ απρόσωπο. Η εμπειρία μένει ζεστή και φιλική από την αρχή μέχρι το τέλος.",
      },
      {
        icon: "mdi-star-four-points-outline",
        title: "Αξέχαστη, όχι βιαστική εμπειρία",
        description: "Ισορροπούμε τη βόλτα, το ψάρεμα, το μπάνιο και την ξεκούραση ώστε η ημέρα να κυλά φυσικά.",
      },
    ],
  },
};

export const TRANSFERS_CONTENT: Record<SupportedLocale, TransferContent> = {
  en: {
    overview: [
      "We arrange reliable private transfers from Corfu Airport, Corfu Port, and Lefkimmi Port to Kavos and the surrounding areas of South Corfu.",
      "If you are joining one of our tours and staying outside Kavos, we can also organize pickup as an extra service so your day starts smoothly from the moment you leave your accommodation.",
    ],
    services: [
      {
        icon: "mdi-airplane-takeoff",
        title: "Corfu Airport transfers",
        description: "Direct pickup and drop-off between Corfu Airport and Kavos or nearby South Corfu stays.",
      },
      {
        icon: "mdi-ferry",
        title: "Port arrivals and departures",
        description: "We cover both Corfu Port and Lefkimmi Port for guests arriving by ferry or continuing their trip by sea.",
      },
      {
        icon: "mdi-map-marker-path",
        title: "South Corfu accommodation transfers",
        description: "Private transport for hotels, villas, apartments, and meeting points across the south of the island.",
      },
      {
        icon: "mdi-van-passenger",
        title: "Tour-day pickup outside Kavos",
        description: "Guests booking a boat trip with us can add pickup from outside Kavos by prior arrangement.",
      },
    ],
    coverage: [
      "Corfu Airport (CFU)",
      "Corfu Port / New Port",
      "Lefkimmi Port",
      "Kavos, Lefkimmi, Perivoli, Argyrades, Marathias, and nearby South Corfu areas",
      "Pickup for tour guests staying outside Kavos, subject to arrangement",
    ],
    note:
      "For guests who book a tour with us and stay outside the Kavos area, we can arrange pickup based on your location, timing, and group details. Send us the details in advance and we will confirm the best plan for your day.",
    inquiryOptions: [
      "Corfu Airport Transfer",
      "Corfu Port Transfer",
      "Lefkimmi Port Transfer",
      "South Corfu Hotel or Villa Transfer",
      "Tour Pickup Outside Kavos",
    ],
  },
  el: {
    overview: [
      "Αναλαμβάνουμε αξιόπιστες ιδιωτικές μεταφορές από το Αεροδρόμιο Κέρκυρας, το Λιμάνι Κέρκυρας και το Λιμάνι Λευκίμμης προς τον Κάβο και τις γύρω περιοχές της Νότιας Κέρκυρας.",
      "Αν έχετε κλείσει κάποια εκδρομή μαζί μας και μένετε εκτός Κάβου, μπορούμε επίσης να οργανώσουμε παραλαβή ως πρόσθετη υπηρεσία ώστε η ημέρα σας να ξεκινήσει άνετα από τη μετακίνησή σας.",
    ],
    services: [
      {
        icon: "mdi-airplane-takeoff",
        title: "Μεταφορές από το αεροδρόμιο",
        description: "Απευθείας παραλαβή και μεταφορά από και προς το Αεροδρόμιο Κέρκυρας για Κάβο και γύρω περιοχές της Νότιας Κέρκυρας.",
      },
      {
        icon: "mdi-ferry",
        title: "Μεταφορές από λιμάνια",
        description: "Καλύπτουμε τόσο το Λιμάνι Κέρκυρας όσο και το Λιμάνι Λευκίμμης για αφίξεις και αναχωρήσεις με πλοίο.",
      },
      {
        icon: "mdi-map-marker-path",
        title: "Μεταφορές σε καταλύματα Νότιας Κέρκυρας",
        description: "Ιδιωτική μεταφορά για ξενοδοχεία, βίλες, διαμερίσματα και σημεία συνάντησης σε όλη τη νότια πλευρά του νησιού.",
      },
      {
        icon: "mdi-van-passenger",
        title: "Παραλαβή για εκδρομές εκτός Κάβου",
        description: "Οι επισκέπτες που κλείνουν θαλάσσια εκδρομή μαζί μας μπορούν να προσθέσουν παραλαβή από περιοχές εκτός Κάβου κατόπιν συνεννόησης.",
      },
    ],
    coverage: [
      "Αεροδρόμιο Κέρκυρας (CFU)",
      "Λιμάνι Κέρκυρας / Νέο Λιμάνι",
      "Λιμάνι Λευκίμμης",
      "Κάβος, Λευκίμμη, Περιβόλι, Αργυράδες, Μαραθιάς και γύρω περιοχές της Νότιας Κέρκυρας",
      "Παραλαβή για επισκέπτες εκδρομών που μένουν εκτός Κάβου, κατόπιν συνεννόησης",
    ],
    note:
      "Για επισκέπτες που κλείνουν εκδρομή μαζί μας και διαμένουν εκτός περιοχής Κάβου, μπορούμε να οργανώσουμε παραλαβή ανάλογα με την τοποθεσία, την ώρα και τα στοιχεία της κράτησης. Στείλτε μας τις λεπτομέρειες εκ των προτέρων και θα επιβεβαιώσουμε το καλύτερο πλάνο για την ημέρα σας.",
    inquiryOptions: [
      "Μεταφορά από Αεροδρόμιο Κέρκυρας",
      "Μεταφορά από Λιμάνι Κέρκυρας",
      "Μεταφορά από Λιμάνι Λευκίμμης",
      "Μεταφορά σε ξενοδοχείο ή βίλα στη Νότια Κέρκυρα",
      "Παραλαβή για εκδρομή εκτός Κάβου",
    ],
  },
};

export const FAQS: Record<SupportedLocale, FaqItem[]> = {
  en: [
    {
      question: "Do I need fishing experience?",
      answer: "No experience is needed. We provide the gear and help you through the process on board.",
    },
    {
      question: "What should I bring?",
      answer: "Bring sunscreen, swimwear, a towel, and a light layer for the return trip if you book the sunset route.",
    },
    {
      question: "Are the tours suitable for children?",
      answer: "Yes. Families are welcome, and we keep the pace relaxed. Children should be supervised by an adult.",
    },
    {
      question: "What happens if the weather changes?",
      answer: "Safety comes first. If the weather is not suitable, we will reschedule your trip or arrange the appropriate refund.",
    },
    {
      question: "Can I book privately for my group?",
      answer: "Yes. Use the contact form or WhatsApp and tell us your dates, group size, and preferred route.",
    }
  ],
  el: [
    {
      question: "Χρειάζεται να έχω εμπειρία στο ψάρεμα;",
      answer: "Όχι. Παρέχουμε τον εξοπλισμό και σας καθοδηγούμε στο σκάφος σε όλη τη διάρκεια.",
    },
    {
      question: "Τι πρέπει να φέρω μαζί μου;",
      answer: "Πάρτε αντηλιακό, μαγιό, πετσέτα και ένα ελαφρύ ρούχο για την επιστροφή αν έχετε κλείσει την απογευματινή εκδρομή.",
    },
    {
      question: "Είναι οι εκδρομές κατάλληλες για παιδιά;",
      answer: "Ναι. Οι οικογένειες είναι ευπρόσδεκτες και ο ρυθμός παραμένει χαλαρός. Τα παιδιά πρέπει να συνοδεύονται από ενήλικα.",
    },
    {
      question: "Τι γίνεται αν αλλάξει ο καιρός;",
      answer: "Η ασφάλεια είναι προτεραιότητα. Αν οι συνθήκες δεν είναι κατάλληλες, θα κανονίσουμε νέα ημερομηνία ή την ανάλογη επιστροφή χρημάτων.",
    },
    {
      question: "Μπορώ να κάνω ιδιωτική κράτηση για την παρέα μου;",
      answer: "Ναι. Στείλτε μας μήνυμα από τη φόρμα ή στο WhatsApp με ημερομηνίες, αριθμό ατόμων και τη διαδρομή που προτιμάτε.",
    }
  ],
};

export const GALLERY: Record<SupportedLocale, GalleryItem[]> = {
  en: [
    {
      src: "/images/blue-lagoon-beach-sivota.jpg",
      alt: "Blue Lagoon waters during a morning swim stop",
    },
    {
      src: "/images/blue-lagoon-cave-sivota.jpg",
      alt: "Guests exploring a sea cave near Sivota",
    },
    {
      src: "/images/paxos-antipaxos-caves.jpg",
      alt: "Rock formations and caves around Paxos",
    },
    {
      src: "/images/paxos-blue-caves.jpg",
      alt: "Clear turquoise water near Antipaxos",
    },
    {
      src: "/images/sivota-sunset-tour.jpg",
      alt: "Sunset colors across the sea on the evening tour",
    },
    {
      src: "/images/happy-tours-captain.png",
      alt: "The Happy Tours captain welcoming guests aboard",
    },
  ],
  el: [
    {
      src: "/images/blue-lagoon-beach-sivota.jpg",
      alt: "Τα νερά της Γαλάζιας Λιμνοθάλασσας σε πρωινή στάση για μπάνιο",
    },
    {
      src: "/images/blue-lagoon-cave-sivota.jpg",
      alt: "Επισκέπτες που εξερευνούν θαλάσσια σπηλιά κοντά στα Σύβοτα",
    },
    {
      src: "/images/paxos-antipaxos-caves.jpg",
      alt: "Βραχώδεις σχηματισμοί και σπηλιές γύρω από τους Παξούς",
    },
    {
      src: "/images/paxos-blue-caves.jpg",
      alt: "Καθαρά τιρκουάζ νερά κοντά στους Αντίπαξους",
    },
    {
      src: "/images/sivota-sunset-tour.jpg",
      alt: "Χρώματα ηλιοβασιλέματος στη θάλασσα κατά την απογευματινή εκδρομή",
    },
    {
      src: "/images/happy-tours-captain.png",
      alt: "Ο καπετάνιος της Happy Tours υποδέχεται τους επισκέπτες στο σκάφος",
    },
  ],
};

export const LEGAL_COPY: Record<
  SupportedLocale,
  {
    privacy: string[];
    terms: string[];
  }
> = {
  en: {
    privacy: [
      "We collect the personal information you share with us through the contact form so we can respond to your enquiry, arrange bookings, and communicate important trip details.",
      "We do not sell your personal data. We only share information with service providers when needed to deliver our services or comply with legal obligations.",
      "If you would like us to update or delete your personal information, contact us by email and we will assist you.",
    ],
    terms: [
      "All bookings depend on availability and weather conditions. We may adjust routes or timing if safety requires it.",
      "Guests are responsible for following the captain's safety instructions while on board and during swim stops.",
      "If you need to cancel or change your booking, contact us as early as possible so we can discuss the available options.",
    ],
  },
  el: {
    privacy: [
      "Συλλέγουμε τα προσωπικά στοιχεία που μοιράζεστε μαζί μας μέσω της φόρμας επικοινωνίας ώστε να απαντήσουμε στο αίτημά σας, να οργανώσουμε κρατήσεις και να επικοινωνήσουμε απαραίτητες λεπτομέρειες της εκδρομής.",
      "Δεν πουλάμε προσωπικά δεδομένα. Μοιραζόμαστε πληροφορίες μόνο με συνεργάτες όταν είναι απαραίτητο για την παροχή των υπηρεσιών μας ή για νομική συμμόρφωση.",
      "Αν θέλετε να διορθώσουμε ή να διαγράψουμε τα προσωπικά σας στοιχεία, επικοινωνήστε μαζί μας με email και θα σας βοηθήσουμε.",
    ],
    terms: [
      "Όλες οι κρατήσεις εξαρτώνται από τη διαθεσιμότητα και τις καιρικές συνθήκες. Μπορούμε να προσαρμόσουμε τη διαδρομή ή την ώρα αν το απαιτεί η ασφάλεια.",
      "Οι επισκέπτες οφείλουν να ακολουθούν τις οδηγίες ασφαλείας του καπετάνιου στο σκάφος και στις στάσεις για μπάνιο.",
      "Αν χρειάζεται να ακυρώσετε ή να αλλάξετε την κράτησή σας, επικοινωνήστε μαζί μας όσο το δυνατόν νωρίτερα για να δούμε τις διαθέσιμες επιλογές.",
    ],
  },
};
