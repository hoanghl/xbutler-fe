import type { Strings } from "../type";

/**
 * English locale
 */
const en: Strings = {
  time: {
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday"
    },
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December"
    }
  },
  generic: {
    calculating: "Calculating...",
    notImplemented: "Not implemented",
    close: "Close",
    cancel: "Cancel",
    continue: "Continue",
    back: "Back",
    skip: "Skip",
    success: "Success",
    noInternetConnection: "No internet connection",
    on: "ON",
    off: "OFF"
  },

  statusScreen: {
    exposure: "Exposure",
    record: "Record",
    yourDayInMicrograms: "Your day in micrograms",
    yourWeekInMicrograms: "Your week in micrograms",
    yourMonthInMicrograms: "Your month in micrograms",
    yourYearInMicrograms: "Your year in micrograms",
    recordingIsOff: "Recording is off",
    foregroundLocationRequiredHeader: "Location permission required",
    foregroundLocationRequiredBody: "Foreground location permission is required to use application features",
    turnMonitoringOnDescirption:
      "This is where your personal air quality history will be shown. Tap to start recording!",
    turnMonitoringOn: "Turn on Data Recording",
    startRecording: "Start recording",
    swipeToHide: "Swipe to hide",
    recordingDescripton:
      "By turning on data recording you can track your predicted exposure to air pollutant for 24 hrs. You can access daily, weekly and annual exposure history from the User Profile page."
  },

  errorHandling: {
    notInServiceRegion: "{0} not in service region",
    secureStorage: {
      fetch: "Error when fetching from secure storage",
      update: "Error when updating secure storage"
    },
    googleMapApi: {
      fetch: "Error when fetching from google map api"
    },
    pollutants: {
      fetch: "Error when fetching pollutants"
    },
    pollutantColorCodes: {
      fetch: "Error when fetching pollutant color codes"
    },
    routingModes: {
      fetch: "Error when fetching routing modes"
    },
    routes: {
      fetch: "Error when fetching routes"
    },
    airQuality: {
      fetch: "Error when fetching air qualities"
    },
    auth: {
      anonymousLogin: "Error while connecting to services",
      login: "Error while logging in",
      biometric: "Error during biometric authentication",
      onlyAuthUsersError: "Feature is available to authenticated users only",
      removeSplash: "Error while removing splash screen"
    },
    savedLocations: {
      fetch: "Error while fetching saved locations",
      delete: "Error while deleting saved location",
      update: "Error while updating saved location"
    },
    routeHistory: {
      create: "Error while creating navigation playback record",
      fetch: "Error while fetching navigation playback data",
      delete: "Error while deleting a route from history"
    },
    routeExposure: {
      create: "Error while creating route exposure",
      fetch: "Error while fetching route exposure",
      delete: "Error while deleting a route exposure"
    },
    user: {
      fetch: "Error while fetching user",
      update: "Error while updating user",
      subscriptionStatus: "Error while fetching user subscription status"
    },
    registration: {
      emailInboxOpen: "Error while opening email client. Please go to your email inbox manually.",
      resendVerificationEmail: "Error while attempting to resend verification email"
    },
    favouriteLocation: {
      create: "Error while creating favourite locations",
      fetch: "Error while fetching favourite locations"
    },
    magnetometerPermission: {
      error: "Magnetometer sensor permission is required to use compass"
    },
    passiveExposure: {
      create: "Error while creating user passive exposure data",
      fetch: "Error while fetching user passive exposure data",
      initialUpdate: "Error while performing the INITIAL update of passive exposure data",
      periodicalUpdate: "Error while performing the PERIODICAL update of passive exposure data"
    },
    iapSubscription: {
      create: "Error during subscription confirmation. Try again later.",
      error: "Subscription payment cancelled. Please try again."
    },
    fallbackCityMetadata: {
      fetch: "Current location not belonged to supported cities. Switch to Helsinki by default."
    }
  },

  subscriptionNotificationHandling: {
    dialog: {
      goToSubscriptionManagement: "Go to subscription management"
    },
    notPremiumUserMessage:
      "This feature is available to premium users only. Please upgrade your subscription in order to use it."
  },

  auth: {
    loginSessionExpiredTitle: "Login session has expired",
    loginSessionExpiredContent: "Login session has expired. Please login again.",
    loginRequired: "Login with credentials",
    login: "Login",
    logout: "Logout",
    existingAccount: "Login",
    inputCode: "Input your code",
    incorrectCode: "Incorrect code",
    loginWithBiometric: "Login with biometric authentication",
    tryAgain: "Try again"
  },

  authPopup: {
    title: "Please Login",
    description: "In order to use this feature you need to first register and login as a user.",
    registerButton: "Register",
    alreadyHaveAccount: "Already have an account?",
    loginButton: "Log in",
    notNowButton: "Not now"
  },

  confirmation: {
    unsubscribe: "Are you sure you want to unsubscribe?",
    removeCard: "Are you sure you want to remove your card details?"
  },

  monitoringControlPopup: {
    title: "Enable data collection",
    description:
      "By enabling the personal air quality history recording you can track your potential exposure history for the last 24hrs. You can then also access daily and annual exposure history data from your User Profile page.",
    startRecordingSwitch: "Record pollution data",
    closeButton: "Close"
  },

  emailVerificationScreen: {
    labels: {
      title: "Email verification",
      salutation: "Dear {0},",
      body: "We have sent you an email with a verification link to your address {0}. Please check your email inbox and click the link to verify your account.",
      haventReceivedEmail: "Haven't received an email?",
      verifyEmailButton: "Open mailbox",
      resendEmailButton: "Resend email",
      resendEmailAgaingCountdownButton: "Can resend again in {0} seconds",
      emailAlreadyVerified: "Email already verified"
    }
  },

  registrationScreen: {
    labels: {
      title: "Basic info.",
      body: "We need to collect some basic information about you to create your account. We are aiming to provide you with the best experience possible! Please fill in the form below.",
      disclaimer: "We do not share this information with third parties either!"
    },
    userInput: {
      userNameLabel: "Username",
      firstNameLabel: "First name",
      surnameLabel: "Surname",
      emailLabel: "E-mail",
      passwordLabel: "Password"
    },
    messages: {
      passwordCheckFail: "Passwords don't match...",
      emailCheckFail: "Enter a valid email",
      emailAlreadyRegistered: "Email already registered",
      emptyCheckFail: "can not be empty.",
      loginFail: "Incorrect email or password.",
      passwordRequirementFail: "Password must be 8 characters long and contain one number"
    }
  },

  mapScreen: {
    navigate: "Navigate",
    source: "Starting location",
    destination: "Destination location",
    greeting: "Where are you headed?",
    locationDialog: {
      saveLocation: "Save this location",
      saveWorkLocation: "Save as work location",
      saveHomeLocations: "Save as home location",
      setDestination: "Get me there!",
      workPlaceNotSet: "Workplace not set. Want to set it?",
      homePlaceNotSet: "Home not set. Want to set it?",
      originDestinationAreTheSame: "Starting location can't be the same as the destination.",
      enterLocationName: "Name the location"
    },
    footer: {
      whereTo: "Go to!",
      currentLocation: "My location",
      planRoute: "Plan a route",
      home: "home",
      work: "work",
      back: "Back",
      openExposureDial: "Exposure Record",
      start: "Navigate!",
      locationPopup: {
        info: "We`ll calculate the cleanest route for you.",
        whereTo: "Where to?",
        whereFrom: "Where From?",
        sourceInput: "Type starting location",
        destinationInput: "Type destination",
        locations: "Saved locations",
        savedRoutes: "Saved routes",
        histories: "Local histories"
      },
      strictness: "Select route calculation type",
      accessibility: "Select the route type"
    },
    chooseFromMap: {
      title: "Select destination from the map",
      currentPosition: "Current position",
      destination: {
        confirm: "Go here"
      },
      source: {
        confirm: "Go here"
      },
      home: {
        confirm: "Save location",
        description: "Set your home location"
      },
      work: {
        confirm: "Save location",
        description: "Set your work place location"
      }
    },
    navigation: {
      summary: "Summary",
      arrived: "Arrived at destination!",
      reviewNow:
        "Do you want to review the route data now? You can always review it from your profile Navigation Playback.",
      viewSummary: "View summary",
      notNow: "Not now",
      direction: {
        continue: "Continue along",
        right: "Turn right at",
        left: "Turn left at",
        back: "Turn back at",
        depart: "Depart from",
        destination: "Destination"
      }
    },
    loader: {
      fetchingRoutes: "Fetching routes...",
      fetchingAirQuality: "Fetching air quality..."
    },
    layerControl: {
      mapSettings: "Pollution overlay",
      selectPollutant: "Select which pollutant heatmap overlay is displayed on the map",
      premiumFeature: " - Premium feature"
    },
    foregroundLocationModal: {
      header: "Foreground location permission required",
      body: "GO2 application collects location data to enable map user location, route planning and step-by-step navigation when the application is open and visible on the screen.",
      requestIOS: "Please select 'Allow While Using App' for optimal experience.",
      requestAndroid: "Please select 'Precise' location access 'While using the app' for optimal experience.",
      button: "Next",
      alert:
        "Device precise location access is required for correct functionality of the map related features like: map user location, route planning and step-by-step navigation. Please allow precise location access in your device settings. Otherwise, application functionality will be limited."
    }
  },

  routeHistory: {
    timeline: "Timeline",
    instruction: "Scroll the bottom timeline sideways to see the statistics for location measurements.",
    micrograns: "Micrograms:",
    summary: {
      underGuideLine: "Good job! You stayed mostly under the WHO guidelines!",
      aboveGuideLine: "Oops! You stayed mostly above the WHO guidelines!"
    }
  },

  userSubscriptionHandler: {
    moreThanOneSubscriptionAlert:
      "User has more than one subscription type. This is not supported yet. Falling back to external subscription provider."
  },

  appVersionHandler: {
    alertTitle: "New GO2 app version available",
    alertMessage: "Please update the app to the latest version to get the best possible experience.",
    errorCheckingVersion: "Error when checking app version"
  },

  menuScreen: {
    titles: {
      menu: "MENU",
      personalDetails: "PERSONAL DETAILS",
      settings: "SETTINGS",
      statistics: "EXPOSURE RECORDS",
      routeHistory: "NAVIGATION PLAYBACK",
      routeHistoryMap: "NAVIGATION PLAYBACK MAP",
      routeHistoryStatistic: "NAVIGATION PLAYBACK STATISTIC",
      savedLocations: "SAVED LOCATIONS",
      savedLocationsEdit: "EDIT SAVED LOCATION",
      paymentDetails: "SUBSCRIPTION",
      privacy: "PRIVACY INFORMATION",
      information: "APP INFORMATION",
      eula: "USER LICENSE AGREEMENT"
    },
    navigation: {
      statistics: "Exposure Records",
      savedLocations: "Saved Locations",
      settings: "Settings",
      personalDetails: "Personal Details",
      routeHistory: "Navigation Playback",
      paymentDetails: "Subscription",
      privacy: "Privacy information",
      information: "go:2 +",
      eula: "User license agreement"
    },
    menu: {
      username: "Username",
      personalInformation: "Personal information",
      firstName: "First name",
      surname: "Surname",
      email: "E-mail"
    },
    localSettings: {
      preferGoogleMaps: "Use Google Maps",
      darkMode: "Enable dark mode",
      compassRotateMap: "Compass map rotation",
      passiveDataCollection: "Allow pollution data recording",
      permissionsRequired: "You have to allow app to use your location to use this feature.",
      backgroundLocationPermissionRequired:
        "You have to allow app to use your location in background to use this feature. You can do it in your phone Location settings.",
      backgroundLocationModalHeader: "Background location permission required",
      backgroundLocationModalBody:
        "GO2 application collects location data to enable passive pollution exposure tracking even when the app is closed or not in use.",
      backgroundLocationModalRequestIOS: "Please select 'Always Allow' for optimal experience.",
      backgroundLocationModalRequestAndroid: "Please select 'Allow all the time' for optimal experience.",
      backgroundLocationModalRequestButton: "Next",
      mikkeliMode: "Test navigation in Finland mode",
      enableDebugNotifications: "Enable debug notifications",
      takeMeToLondon: "London exposure testing",
      debugModeSectionTitle: "Debug mode settings",
      debugModeSectionInstruction: "to disable debug mode - tap dial 10 times",
      appVersion: "App version: "
    },
    routeHistory: {
      latestTrips: "Latest trips"
    },
    statistics: {
      combined: "Combined",
      noData: "No data",
      distance: "Traveled distance",
      duration: "Duration",
      alert: "You've stayed safe {0}% of the time!",
      pollutionComposition: "Your exposure to pollutants",
      yesterday: "Yesterday",
      today: "Today",
      scopes: {
        day: "Day",
        week: "Week",
        month: "Month",
        year: "Year"
      }
    }
  },

  paymentHandling: {
    subscriptionTypeFree: "FREE",
    subscriptionTypePaid: "PREMIUM",
    currentSubscriptionLabel: "Current subscription type: ",
    subscriptionBenefitsLabel: "Subscription benefits",
    subscriptionCanceledLabel: "Your subscription was canceled. It will expire on",
    updateSubscriptionError: "Failed to update an existing subscription",
    cardDeleteError: "Error when deleting user payment card",
    currency: "£",
    cardEndingLabel: "Card ending with",
    cardChangeLabel: "Change",
    cardRemoveLabel: "Remove",
    cardAddLabel: "Add payment method",
    subscribedStatusMarketingText: "Nice, you're subscribed. The app's full potential has been unleashed!",
    unsubscribedStatusMarketingText:
      "You're using a FREE version of the app. Subscribe now to unleash the full power of the app!",
    offeredFeaturesMarketingTitle: "With the monthly subscription {0} {1} you'll get the following features:",
    offeredFeaturesPricePrefix: "of",
    offeredFeatures: {
      feature1: "Exposure Record",
      feature2: "Healthy navigation stats",
      // feature3: "Pollution maps", (note, this has become a free feature)
      feature4: "Navigated route playback"
    },
    paymentMethodSetForFuturePayments: "Your payment method is successfully set up for future payments!",
    subscriptionPaymentProcessingLabel: "Processing...",
    iapSpecific: {
      subscriptionActive: "Subscription active",
      priceLabel: "Price:",
      perMonthLabel: "per month",
      externalSubscriptionCurrentWarning:
        "You have an active subscription managed by Stripe. To manage your external subscription, please use the device where you originally made the purchase.",
      externalSubscriptionExpiredWarning:
        "You previousely had an active subscription managed by Stripe. To manage your external subscription, please use the device where you originally made the purchase.",
      purchaseSubscriptionButton: "Purchase subscription",
      manageSubscriptionButton: "Manage subscription",
      restorePurchasesButton: "Restore purchases",
      restorePurchasesSuccessAlert: "Purchases successfully restored",
      restorePurchasesFailAlert: "Failed to restore purchases. No valid subscriptions found."
    },
    stripeSpecific: {
      subscribeLabel: "Subscribe",
      unsubscribeLabel: "Unsubscribe",
      userPaymentDetailsFetchingFailedError: "Failed to fetch user payment datails",
      userDataFetchingFailedError: "Failed to fetch user details",
      subscriptionPaymentFailedError: "Subscription payment failed",
      subscriptionCancelFailedError: "Subscription canceling failed",
      createSubscriptionError: "Failed to create a subscription",
      createTrialSubscriptionError: "Failed to create a trial subscription",
      maxOneSubscriptionError: "Can not have more than one subscription",
      invoiceUnableToChargeCardLabel: "We were unable to charge from your card, please check your payment details",
      paymentDetails: "Payment details",
      invoicePaymentLabel: "Payment",
      invoiceCurrencyEur: "€",
      externalSubscriptionWarning:
        "You have an active subscription managed by Apple Store In App Purchases. To manage your external subscription, please use the device where you originally made the purchase.",
      trialPeriodEnds: "Trial period ends on: ",
      trialPeriodEligibility: "You are eligible for a trial period of 90 days!",
      trialDescription:
        "To activate your trial period, please update your payment details and press the button 'Start trial' below. The first payment will only be charged after the trial period ends. You can cancel at any time.",
      startTrialButton: "Start trial"
    }
  },

  savedLocationsScreen: {
    work: "Work",
    home: "Home",
    setNow: "Set now",
    createLocation: "Create new location"
  },

  savedLocationsEditScreen: {
    deleteLocationButton: "Delete saved location",
    nameLabel: "Name",
    locationLabel: "Address",
    updateLocationButton: "Save changes",
    createLocationButton: "Create location",
    selectFromMapButton: "Select location from map"
  },

  instructions: {
    exposureRecord: {
      mainTitle: "You're Now Recording!",
      intro:
        "To get the most of the GO2 app, please read the data dial instructions below. You can always access these from your User Profile.",
      title: "EXPOSURE RECORD",
      description1:
        "The exposure record represents a 24hr clock of predicted data gathered from GO2 air pollution maps even when the application is running in the background.",
      description2:
        "The record is a coloured time series of modelled breathable air based on your location. Our model uses different calculations depending if you are stationary in a building or moving around outside.",
      description3:
        "Staying below the inner blue dotted circle means you are in the clean air zone. Going above the inner purple circle means the air quality could be better and perhaps you should do something.",
      tip1: "Tip: Try out the healthy navigation to avoid bad pollution areas!",
      pollutantsBold: "PM2.5, CO, NO2, NO",
      description4:
        "Below the exposure record is a breakdown of the air pollutants you have been potentially exposed to over the day. The estimated concentrations are in very very small units (one millionth of gram) but these still can be toxic and should not accumulate over time. The lower the value the cleaner the air.",
      tip2: "Tip: You can compare the daily and annual exposure from the User Profile page under the Exposure history.",
      noteTitle: "Note!",
      noteBody:
        "Currently the app collects pollution data on the background. If the app is forcefully closed, there might be issues with the collection. So pressing the “home” is fine, but swiping the app completely off might cause some issues.",
      closeButton: "Close"
    },
    healthyNavigation: {
      mainTitle: "Healthy Navigation",
      description1:
        "GO2 application suggests the healthiest route from your present location to your chosen destination based on the modelled air pollution maps.",
      description2:
        "You select the destination and mode - walking or cycling, and the model calculates the least polluted route which may not be the fastest but you avoids high polluted areas. The navigation suggestion are updated according the predicted air pollution conditions. Once you follow the suggested GO2 route, you receive step-by-step guidance and can review the exposure trip for subsequent evaluation.",
      tip1: "Tip: Save your home and work locations for quick navigation either by pressing your finger on the map on the desired location or from your Profile page under Saved Locations. You can also add other locations you visit frequently for quick navigation.",
      startNavigatingButton: "Start navigating!",
      notNowButton: "Not now"
    },
    pollutionMaps: {
      mainTitle: "Pollution Maps",
      description1: "GO2 application can show you the pollution levels in your area.",
      description2:
        "You can see the pollution levels in the map view by selecting the pollution type you want to see from the top right corner of the map.",
      description3: "Pollution maps data is updated dynamically.",
      closeButton: "Close"
    }
  }
};

export default en;
