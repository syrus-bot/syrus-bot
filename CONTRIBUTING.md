# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the maintainer of this repository before making a change.

Please note we have a code of conduct (see below section), please follow it in all your 
interactions with the project.

## Pull Request Process

1. Ensure any dependencies are updated to be as recent as possible, and all security issues
   are audited.
2. Ensure the build passes all checks and your contribution follows all our guidelines.
3. Update the CHANGELOG.md with details of changes.
4. Increment the version numbers in any example files, README.md, and CHANGELOG.md to the new
   version that this Pull Request would represent. The versioning scheme we use is [semantic
   versioning](https://semver.org).
5. You may merge the Pull Request once you have acquired the approval of two other developers,
   or if you do not have permission to do that, you may request the most recent reviewer to
   do it for you.
   
## Standard of Work

### Licensing

As per our license, the [GNU GPL v3.0][license], our [notice][notice] must be applied to the 
top of all source files that are part of Syrus. This does not include JSON, but rather any
actual script, code, or program files. This is vital to maintain our OSS ecosystem, and as
such any contribution that fails to adhere will be rejected until it is fixed.

[license]: https://github.com/syrus-bot/syrus-bot/blob/master/COPYING
[notice]: https://github.com/syrus-bot/syrus-bot/blob/master/COPYING.NOTICE

### Formatting

* Tabs for indentation.
* UNIX style newlines, and one at the end of every file.
* Trim all trailing whitespace.
* Use semicolons at the end of every statement (but not after declarations).
* 80 characters per line of source code.
* Use backticks for string formatting instead of concatenation.
* Use backticks for strings with formatting, and double quotes for no formatting.
* Block declaration braces go on the same line as the condition or declarative statement.
* Declare only one variable per declarative statement, rather than comma separating.

### Naming Conventions

* Use lowerCamelCase for variables, properties, and function names.
* Use UpperCamelCase for class names.
* Use UPPERCASE for static class property constants.

### Array and Object Declaration

* Use trailing commas.
* Do not put spaces in keys for objects.
* Do not wrap key names in quotes.

### Conditionals

* Use the `===` operator instead of `==` (and `!==` instead of `!=` too).
* Use descriptive conditionality variables for complex conditions.

### Functions

* Keep functions at a minimal length, and create other functions to avoid complication.
* Make return statements clear and return as early as possible.
* Use one method per line when chaining, and indent them from the original object.

### Comments

* Only use comments for licensing or to clarify complex segments of code.
* Use `/* */` only for licensing. Standard one-lines should be used for all other comments.

### Miscellaneous

* Licensing goes at the top of every file.
* Licensing is always followed by requires / imports. Nothing comes between.
* Sort requirements by consistent project-wide usage, and then alphabetically.

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

### Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
[INSERT CONTACT METHOD].
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

#### Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

#### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

#### 2. Warning

**Community Impact**: A violation through a single incident or series
of actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or
permanent ban.

#### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

#### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior,  harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within
the community.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.0, available [here][version].

Community Impact Guidelines were inspired by [Mozilla's code of conduct
enforcement ladder](https://github.com/mozilla/diversity).

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at
https://www.contributor-covenant.org/translations.

[homepage]: https://www.contributor-covenant.org
[version]: https://www.contributor-covenant.org/version/2/0/code_of_conduct.html