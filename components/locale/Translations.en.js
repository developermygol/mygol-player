export default {
  Next: 'Next',
  Save: 'Save',
  'Not implemented': 'Not implemented yet',

  // Login
  LoginEmail: 'Email',
  'LoginEmail.PlaceHolder': 'john@mygol.es',
  'LoginEmail.Validation': 'email cannot be empty',
  Password: 'Password',
  'Invalid credentials': 'User or password not valid',
  LoginWelcome: 'Welcome',
  LoginIntro: 'Enter the email address you used to register in the platform.',
  GoToLogin: 'Go to login',

  // Password:
  LoginPassword: 'Password',
  'LoginPassword.Validation': 'Password cannot be empty',
  PasswordTitle: 'Password',
  PasswordIntro: 'To complete the sign in process',
  PasswordForgotten: 'Forgot password?',
  PasswordForgotTitle: 'Reset password',
  PasswordForgotIntro: 'Enter the email address to request a password reset',
  PasswordForgotBack: 'go back to the login screen',
  PasswordForgotSuccess: 'An email with password reset instructions has been sent to the address provided.',

  // Pin:
  Pin: 'PIN',
  'LoginPin.Validation': 'PIN number cannot be empty',
  PinTitle: 'PIN',
  PinIntro: 'To validate, enter the PIN number you received in the welcome email.',

  // Org chooser

  Organizations: 'Organizations',
  'Organizations.Hint': 'You are in more than one organization, choose which one you want to use.',
  'Select organization': 'Change organization',

  // Team chooser
  'Loading player data': 'Loading player data...',
  'Choose team': 'Choose team',
  'MoreThanOneTeam.Choose': `Hi {0}, 
you are enrolled in more than one team`,
  'HowToChangeTeam.Hint': 'Choose which one you want to see. You can switch it later using the side menu.',

  // Configuration

  'Config.PersonalInfo': 'Personal info',
  'Config.SocialInfo': 'Public profile',
  'Config.FichaPicture': 'Enrollment picture',
  'Config.IdCardScan': 'Scan updated Id card',

  // Enrollment
  LoadingEnrollment: 'Loading enrollment data',
  WelcomeScreenTitle: 'Welcome',
  Welcome: 'Welcome',
  Invited: 'You have been invited to team',
  InTournament: ' in tourament ',
  EnrollContinue: "Let's continue with the enrollment where we left last time.",
  EnrollStart: "Let's begin the enrollment.",
  TermsScreenTitle: 'Terms and conditions',
  AcceptConditions: 'Continue',
  PersonalDataScreenTitle: 'Personal data',
  'PersonalData.Intro': "Let's fill in some details so to get you set up for playing.",
  'PersonalData.Intro.Approved':
    'Your data has been validated by the organizer and connot be modified. Only the password can be changed:',
  SocialDataScreenTitle: 'Public profile',
  MainPhotoScreenTitle: 'Enrollment picture',
  'MainPhoto.Intro': 'We need a picture of you for the enrollment account.',
  'MainPhoto.Edit': 'Here you can update your enrollment picture.',
  'MainPhoto.Details':
    'The image should have a white background, you should be looking at the camera and your face should be clearly visible, with no sunglasses or other elements covering it.',
  'MainPhoto.AdditionalText':
    "You'll be able to take another picture later to use as your public profile photo.",

  'SocialData.Intro': 'These fields are your public profile. They are visible to everyone and are optional.',

  IdScanScreenTitle: 'Id card picture',
  'IdScan.Details': 'We need a picture of each side of your id card. If possible, use a white background.',
  'IdScan.Front': 'Front',
  'IdScan.Back': 'Back',

  PaymentSummary: 'Summary',

  WaitingPaymentConfig: 'Loading payment details...',
  PaymentFormScreenTitle: 'Payment data',
  'PaymentForm.Intro':
    "This is the payment form. We don't store any of your credit card data, the payment is processed directly by Stripe.",
  'Amount to pay': 'Amount to pay:',

  CardName: 'Name on card',
  CardNumber: 'Card number',
  CardMonth: 'Expire month',
  CardYear: 'Expire year',
  CardCcv: 'CCV (back of the card)',
  CardAddress: "Cardholder's address",
  SelectMonth: 'Select month',

  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  'Congrats.Title': 'Congratulations!',
  'Congrats.EnrollmentSuccessful': 'your enrollment has been processed correctly.',
  'Congrats.Details': 'The organizer has been notified and will validate your data shortly.',
  'Congrats.Suggestion': 'This is a good time to fill in your public profile details!',
  'Congrats.GotoProfile': 'Go to public profile',
  'Congrats.GotoHome': 'No thanks, I want to go to the home screen',

  Home: 'Home',
  Years: 'years',
  Awards: 'Awards',

  EnName: 'Name',
  'EnName.Validation': 'Name is required',
  'EnName.PlaceHolder': '',
  EnSurname: 'Surname',
  'EnSurname.Validation': 'Surname is required',
  'EnSurname.PlaceHolder': '',
  EnAddress1: 'Address 1',
  'EnAddress1.Validation': 'Address is required',
  'EnAddress1.PlaceHolder': '',
  EnAddress2: 'Address 2',
  'EnAddress2.Validation': '',
  'EnAddress2.PlaceHolder': '',
  EnCity: 'City',
  'EnCity.Validation': 'City is required',
  'EnCity.PlaceHolder': '',
  EnState: 'State',
  'EnState.Validation': 'State is required',
  'EnState.PlaceHolder': '',
  EnCp: 'Postal code',
  'EnCp.Validation': 'Postal code is required',
  'EnCp.PlaceHolder': '',
  EnCountry: 'Country',
  'EnCountry.Validation': 'Country is required',
  'EnCountry.PlaceHolder': '',
  EnIdCardNumber: 'Id card number',
  'EnIdCardNumber.Validation': 'Id card number is required',
  'EnIdCardNumber.PlaceHolder': '',
  EnBirthDate: 'Date of birth',
  'EnBirthDate.Validation': 'Birth date is required',
  'EnBirthDate.PlaceHolder': '',
  EnPassword: 'Password',
  'EnPassword.Validation': 'Password is required and needs to be at least 8 characters long.',
  'EnPassword.PlaceHolder': '',
  EnFieldPosition: 'Field position',
  'EnFieldPosition.Validation': 'Field position is required',

  SoFacebook: 'Facebook URL',
  'SoFacebook.PH': 'https://www.facebook.com/yourname',
  SoInstagram: 'Instagram URL',
  'SoInstagram.PH': 'https://www.instagram.com/yourname',
  SoTwitter: 'Twitter URL',
  'SoTwitter.PH': 'https://twitter.com/yourname',
  SoMotto: 'Motto',
  'SoMotto.PH': 'A short sentence about you',
  SoHeight: 'Height in cm',
  'SoHeight.PH': '176',
  SoWeight: 'Weight in Kg',
  'SoWeight.PH': '76',
  SoProfilePicture: 'Profile picture',

  // Drawer
  Tournaments: 'Tournaments',
  News: 'News',
  TermsAndConditions: 'Terms and conditions',
  Logout: 'Sign out',
  'Login incorrect': 'Incorrect email or password',
  'Select my team': 'Select team',
  Configuration: 'Configuration',

  'Logout?': 'Close session?',
  Confirm: 'Confirm',
  Yes: 'Yes',
  No: 'No',
  Back: 'Back',

  // Team Details
  Players: 'Players',
  Matches: 'Matches',
  'TeamPlayers.NoPlayers': 'No players in team',
  'Team.NoTournamentContext': '--',
  'Team.NoTeamInTournament': '(Team.T)',

  // Rankings
  Rankings: 'Rankings',
  ScorersRanking: 'Scorers',
  GoalKeepersRanking: 'Goalkeepers',
  AssistancesRanking: 'Assists',
  MvpsRanking: 'MVPs',
  FairPlayRanking: 'Fair-play',
  Rank: '#',
  Player: 'Player',
  Team: 'Team',
  'GoalKeeperRatio.Short': 'GC/M',
  'Assistances.Short': 'As.',
  'Mvps.Short': 'Pts',
  'FairPlay.Short': 'Pts',

  // Dream team
  DreamTeam: 'Dream team',
  'DreamTeam.NoPlayers': 'No players in the dream team yet.',

  // Teams
  'Tournament.NoTeams': 'No teams in the tournament yet.',

  // Matches
  'Matches.NoMatches': 'No matches yet.',
  'Match.NoField': 'No field set',
  'Match.NoEvents': 'No events yet.',
  'Match.Overview': 'Match summary',
  Events: 'Events',
  Referees: 'Referees',
  Rests: 'rests',
  Penalties: 'Penalties',

  'Match.Status': 'Status',
  MatchStatus1: 'Match created',
  MatchStatus2: 'Match scheduled',
  MatchStatus3: 'Match playing',
  MatchStatus4: 'Match finished',
  MatchStatus5: 'Match finished',
  MatchStatus6: 'Match postponed',
  MatchStatus8: 'Match cancelled',
  MatchStatus10: 'Team rests',

  Playing: 'PLAYING',

  MatchEventType1: 'Kick off',
  MatchEventType10: 'First half finished',
  MatchEventType11: 'Second half starts',
  MatchEventType12: 'Second half finished',
  MatchEventType13: 'Final time',
  MatchEventType15: 'Extra time first half started',
  MatchEventType16: 'Extra time first half finished',
  MatchEventType17: 'Extra time second half started',
  MatchEventType18: 'Extra time second half finished',
  MatchEventType30: 'Assist',
  MatchEventType31: 'Goal',
  MatchEventType32: 'Goal in own',
  MatchEventType33: 'Corner',
  MatchEventType34: 'Foul',
  MatchEventType40: 'Penalty',
  MatchEventType41: 'Penalty missed',
  MatchEventType42: 'Penalty stopped',
  MatchEventType50: 'Injury',
  MatchEventType61: 'Yellow card',
  MatchEventType62: 'Red card',
  MatchEventType63: 'Blue card',
  MatchEventType64: 'Green card',
  MatchEventType65: 'Orange card',
  MatchEventType70: 'MVP',
  MatchEventType80: 'Penaty shootout',
  MatchEventType100: 'Record closed',

  'Match.NoReferees': 'No referees set',

  // Awards
  AwardType0: 'Dream team',
  AwardType1: 'Most Valued Player',
  AwardType10: 'Top Scorers Ranking',
  AwardType20: 'Top Goalkeepers Ranking',
  AwardType30: 'Top Assistances Ranking',
  AwardType40: 'Top MVPs Ranking',
  AwardType50: 'Best Fair Play',

  'Award.Share': 'Share award',
  'Award.Share.Title': 'Award achieved!',

  // Notifications
  Notifications: 'Notifications',
  Delete: 'Delete',
  'Notifications.Empty': "You don't have any new notifications",
  'Notifications.Empty.Hint': 'This is pretty quiet...',
  'Notifications.New.Title': 'New notification',
  'Notifications.New.Text': 'Check your notifications',
  'Item deleted ok': 'Deleted OK',

  // Facilities
  Field: 'Field',
  'Field.NoField': 'No field set',
  'Field.Name': 'Name',
  'Field.Description': 'Description',
  'Field.Address': 'Address',
  'How to arrive': 'How to get there',

  Classification: 'Classification',
  TournamentCalendar: 'Calendar',
  PlayerStats: 'Player stats',
  PlayerActions: 'My tournament',
  'My.Tournament': 'Classification',
  'My.Calendar': 'My calendar',
  'My.Rankings': 'Rankings',
  'My.Ficha': 'My card',
  'Player.MatchCalendar': 'Player calendar',

  GamesPlayed: 'Played',
  GamesWon: 'Games won',
  GamesDraw: 'Games drawn',
  GamesLost: 'Games lost',
  Points: 'Goals',
  CardsType1: 'Yellow cards',
  CardsType2: 'Red cards',

  'GamesPlayed.Short': 'PL',
  'GamesWon.Short': 'W',
  'GamesDraw.Short': 'D',
  'GamesLost.Short': 'L',
  'CardsType1.Short': 'Y',
  'CardsType2.Short': 'R',
  'TournamentPoints.Short': 'Pt',
  'Points.Short': 'GF',
  'PointsAgainst.Short': 'GA',
  'PointDiff.Short': 'GD',

  FieldPosition: 'Field position',
  FieldPosition0: 'No position',
  FieldPosition1: 'Goalkeeper',
  FieldPosition2: 'Defender',
  FieldPosition3: 'Middle',
  FieldPosition4: 'Forward',
  FieldPosition5: 'Non playing delegate',
  FieldPosition6: 'Coach',
  FieldPosition7: 'Physiotherapist',
  FieldPosition10: 'Defender F5',
  FieldPosition11: 'Target F5',
  FieldPosition12: 'Winger F5',

  FieldSide0: 'Not set',
  FieldSide1: 'Left',
  FieldSide2: 'Middle',
  FieldSide3: 'Right',
  FieldSide4: '--',

  // Ficha
  Ficha: 'Card',
  'Ficha.Number': 'Number',
  'Ficha.Season': 'Season',
  'Ficha.Name': 'Name',
  'Ficha.Surname': 'Surname',
  'Ficha.IdCard': 'Id card #',
  'Ficha.BirthDate': 'Birth date',
  'Ficha.Team': 'Team',
  'Ficha.Apparel': 'Position',
  'Ficha.Share.Title': 'Player card',
  'Ficha.Share': 'Share',

  // Date & time
  shortDateFormat: 'mm/dd/yyyy',
  dateTimeFormat: 'mm/dd/yyyy HH:MM',
  timeFormat: 'HH:MM',

  CurrencySymbol: '€',

  // Payment workflow
  PaymentOptionsSummaryDesc: 'This is the summary of the selected options:',
  Total: 'TOTAL',
  'Fees.Title': 'Other',
  'Fees.Description': 'Handling fees',
  'Payment.NoOptions': 'No options',
  'Payment.AuthenticationLoading': 'Conecting to your bank to validate purchase...',

  // Sanctions
  Tournament: 'Tournament',
  'Sanction.NoSanction': 'No sanction',
  'Sanctions.Tournament.All': 'Tournament sanctions',
  'Sanctions.Match.All': 'Match sanctions',
  'Sanctions.Team.All': 'Team sanctions',
  'Sanctions.Player.All': 'Player sanctions',
  Sanction: 'Sanction',
  'Sanctions.Date': 'Start date',
  'Sanctions.Status': 'Status',
  'Sanctions.NumMatches': 'Num. matches',
  'Sanctions.Match': 'Match',
  'Sanction.Allegations': 'Allegations',
  'Sanction.Matches': 'Sanctioned matches',
  Details: 'Details',

  SanctionStatus1: 'Effective - allegations open',
  SanctionStatus2: 'Effective - allegations closed',
  SanctionStatus3: 'Pending - allegations open',
  SanctionStatus4: 'Done',
  UserLevel1: 'Player',
  UserLevel2: 'Referee',
  UserLevel3: 'Team administrator',
  UserLevel4: 'Organization administrator',
  UserLevel5: 'Superadmin',

  // Loading
  'Loading calendar': 'Loading calendar...',
  'Loading field details': 'Loading field...',
  'Loading match details': 'Loading match...',
  'Loading matches list': 'Loading matches...',
  'Loading ficha details': 'Loading card...',
  'Loading classification': 'Loading classification...',
  'Loading league classification': 'Loading league classification...',
  'Loading teams': 'Loading teams...',
  'Loading team details': 'Loading team...',
  'Loading ranking': 'Loading ranking...',
  'Loading sanction details': 'Loading sanction...',
  'Loading dream team': 'Loading dream team',

  // Terms and conditions
  'Terms.Updated':
    'There is a new revision of the terms and conditions. Please review them before continuing',
  TermsText1: `

BASIC INFORMATION ON DATA PROTECTION

RESPONSIBLE
{0} with id number {1}
{2}

PURPOSE

Fulfill your request for registration, manage and publish information on sporting events in which to participate and show business communications.

LEGITIMATION

Execution of a contract. Consent of the interested party.

ASSIGNMENT TO THIRD PARTIES

Your data can be processed by the company that owns the MYGOL, Technology Sports Management SL application.

RIGHTS

You have the right to access, rectify and delete the data, as well as other rights, indicated in the additional information, which you can exercise by going to the address of the data controller.

DATA PROCEEDINGS

The interested party.
`,
  TermsConsent1: 'I accept the conditions of the privay policy.',
  TermsConsent2:
    'I consent company {0}, with id number {1}, to treat my images in photographs or videos made in the field of sports competitions organized by said company, as well as my full name in order to disseminate the sports activities offered in the app MyGol',
  TermsLinkText: 'Read the full terms and conditions text and the privacy policy',
  'Terms.MustAccept.Title': 'Read the full text of the privacy policy and terms of use',
  'Terms.MustAccept.Message': 'You must accept the terms and conditions to continue',

  // Errors
  'Attempted to perform an unauthorized operation.':
    'An unauthorized operation has been attempted. Please log in and if this error persists, contact your organizer.',
  Error: 'Error',
  NoData: 'No data to show',
  'Error.PlayerData': "Player data couldn't be loaded",
  'Error.TeamData': "Team data couldn't be loaded",
  'Error.TacticData': "Tactic templates couldn't be loaded",
  'Error.NotFound': 'Not found',
  'Error.NotFound.Desc': "The requested data can't be found.",
  'Error.Loading': 'Error loading data.',
  'Error.Saving': 'Error saving data.',
  'Error.NoResponse': 'No response from server',
  'Error.Validation': 'Validation error',
  'Error.Generic': 'Could not complete the operation',
  'Error.404': 'URL not found in server',
  'Error.Client': 'An error ocurred',
  'Error.Client.Detail':
    'An uncontrolled error has occurred in the client application. Try clicking on one of the menu options. If the problem persists, reload the page. The application developer has been notified of the error.',
  'Error.Client.ShowDetails': 'Show details',

  'Error.LoginIncorrect': 'Invalid credentials',
  'Error.EmailNotSet': "Email not set. Can't continue.",
  'Error.NoGroupsInStage': 'No groups in this stage',
  EmptyClassification: 'Classification is empty',
  'Error.NoTeamsInFicha': 'Card contains no teams',
  'Error.NoTournamentsInFicha': 'Card contains no tournament',
  'Error.PlayerWithoutTeams': 'You are not enrolled in any team',
  'Error.NoTeamData': 'No data for that team. Please contact your organizer.',
  'Error.NoPlayerData': 'No data for that player. Please contact your organizer.',
  'Error.PlayernotFound.Hint': 'If you are a referee, you may be need to download the app MyGol Referees',
  'Error.NoImageCaptured':
    'No picture. You have to take one with the camera or select one from the photo gallery.',
  'Error.UploadingImage': 'Error uploading picture',
  'Error.PaymentGateway': 'Payment failed. Please contact with your organization',
  'Error.NonExistent': 'Invalid email',
  'Error.NotFound.Organization': 'Invalid organization',
  'Error.ValidationFailed': 'Some field contains incorrect values',
  'Error.NoOrgs': 'User is not registered in any organization',
  'Error.OrgPaymentNotConfigured':
    'The orgazanition has not configured the payment gateway. Please contact your organizer.',
  'Error.UnknownStepInPaymentWorkflow': 'Unknown enrollment payment workflow status.',
  'Error.Workflow.StepIdNotFoundInWorkflow':
    'Cannot associate the current status of the payment process with the payment settings for your team.',
  'Error.PasswordNoRules': 'Password must be at least 8 characters',
  'Error.TournamentNotVisible': 'This tournament is not visible yet',
  'Error.Upload.413':
    'The image is too big. Upload limit is 1MB. Try cropping the picture or change the resolution of the camera.',
  'Error.PaymentBackend': 'An error occurred while processing the payment. No charge has been made.',
  'Error.UserInMoreThanOneOrg.UpdateYourClient':
    'You are enrolled in more than one organization. You have to update the app to participate in several competitions at once.',
  'Error.EmailNotFound': 'The email provided has not been found',
  'Error.ObsoletePaymentWorkflow.NeedsAppUpgrade':
    'You have to update the app to comply with the new European regulations for online card payments. When you close it and open it again it will update on its own.',
  'Error.PaymentSCAFailed': 'Payment verification has not been completed. No charge has been made.',
  'Error.PaymentConfirmationFailed': 'Payment confirmation failed. No charge has been made.',
};
