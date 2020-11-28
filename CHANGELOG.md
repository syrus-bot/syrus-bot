# 1.0.0 (2020-11-28)


### Bug Fixes

* **client:** fix multi-instancing caused by automatic store registry ([45d2c57](https://github.com/syrus-bot/syrus-bot/commit/45d2c570c305a3c985c79259d7edf68ce6ec2b92))
* **commands:** fix bug where queue persists on disconnect ([d2de919](https://github.com/syrus-bot/syrus-bot/commit/d2de919ad389c743ee2e154fbef8916c1423c3c3))
* **commands:** fix unexpected behaviour of kill command ([61c3611](https://github.com/syrus-bot/syrus-bot/commit/61c36117e5fc127522d588edb5af4b12febadadc))
* **commands:** prevent play from starting queue if already started ([bff8c23](https://github.com/syrus-bot/syrus-bot/commit/bff8c237bb8405ef8ef8954509eb4cfd4ca129b8)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **conf:** patch invalid json for example config ([9b7d135](https://github.com/syrus-bot/syrus-bot/commit/9b7d135562c4f0cfe92673945b86e1a2e2d60982))
* **core:** rename paths to their proper names ([891b548](https://github.com/syrus-bot/syrus-bot/commit/891b548ec131a1add82df59956f903edeaf1ccc2))
* **eslint:** actually finalizing this time ([f3cf6df](https://github.com/syrus-bot/syrus-bot/commit/f3cf6df5f7d119f58e76e27fa05a6bacccff3399))
* **eslint:** attempt to finalize workflow patches ([b96acf5](https://github.com/syrus-bot/syrus-bot/commit/b96acf525a3dd857045fefc8a8aa6e567950b836))
* **eslint:** finalize for real ([458c7f5](https://github.com/syrus-bot/syrus-bot/commit/458c7f579bc28b9c29d4509817ab3001286803b0))
* **eslint:** fix failure to ignore node_modules directory ([7e06a94](https://github.com/syrus-bot/syrus-bot/commit/7e06a94c7f39bd0c4fca7a37f1672ad135f97e3a))
* **eslint:** reflect changes to package with workflows ([3518f92](https://github.com/syrus-bot/syrus-bot/commit/3518f921d1b3416196cbb463b9aa66b12ce0c5ef))
* **i18n:** fix incorrect display type for role command ([d80147e](https://github.com/syrus-bot/syrus-bot/commit/d80147e833a9b0f01c7d5ebfd59be4977ff74fb4))
* **i18n:** patch internationalization failing to load correct namespaces ([096aa96](https://github.com/syrus-bot/syrus-bot/commit/096aa96f93b780265cbdfd3a494e710e1a946791)), closes [i18next/i18next-fs-backend#14](https://github.com/i18next/i18next-fs-backend/issues/14)
* **i18n:** reformat invalid json ([868e789](https://github.com/syrus-bot/syrus-bot/commit/868e78918d565b3cf0dc82d9219806225d491aed))
* **major:** fix sanitization for everyone mentions ([951a3fd](https://github.com/syrus-bot/syrus-bot/commit/951a3fd7237c6c16cd947a999c31d501d4197b78))
* **music:** make rolling embed listen for finish as well as stop ([2748900](https://github.com/syrus-bot/syrus-bot/commit/2748900fd41642006f33df8437d246cab63e2d81)), closes [#19](https://github.com/syrus-bot/syrus-bot/issues/19)
* fix ping measuring system ([56de89f](https://github.com/syrus-bot/syrus-bot/commit/56de89fc9f34f51981c3d8b2923f98e3c839b7dc))


### Code Refactoring

* **i18n:** restructure i18n and add missing keys ([afcbbe2](https://github.com/syrus-bot/syrus-bot/commit/afcbbe2c7edce8d1509472c12d16085cd1bb5cb8)), closes [#14](https://github.com/syrus-bot/syrus-bot/issues/14)


### Features

* **arguments:** add categories argument ([89fca32](https://github.com/syrus-bot/syrus-bot/commit/89fca325170eebff70eaf379916d3c69f45a476d)), closes [#9](https://github.com/syrus-bot/syrus-bot/issues/9)
* **arguments:** add command argument for better command parsing ([6371c46](https://github.com/syrus-bot/syrus-bot/commit/6371c46141390658298e35aae23af317dcbbf353))
* **commands:** add classes that implement categories and helpers ([e348fcb](https://github.com/syrus-bot/syrus-bot/commit/e348fcba7490a336b1946db886948f636338e12a)), closes [#9](https://github.com/syrus-bot/syrus-bot/issues/9)
* **commands:** add join/disconnect ([b8addc7](https://github.com/syrus-bot/syrus-bot/commit/b8addc7cf860e6e22725d5260528a13d7939592b)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **commands:** add np ([11df876](https://github.com/syrus-bot/syrus-bot/commit/11df876056380e8826208a6cba220152660de92d)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **commands:** add pause ([b8f740b](https://github.com/syrus-bot/syrus-bot/commit/b8f740b7af624680bb1a19f6385cd32789bb0df0)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **commands:** add play ([456b73f](https://github.com/syrus-bot/syrus-bot/commit/456b73fd0824395ee71c58886a029e76aeea4f2f)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **commands:** add resume ([009b8d9](https://github.com/syrus-bot/syrus-bot/commit/009b8d9612e8bd2a99f6501f96c5c442de179a83)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **commands:** add skip ([aa1defe](https://github.com/syrus-bot/syrus-bot/commit/aa1defecdb95efb88ea61df98591584a1b645e0d)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **commands:** add the help command ([ccb97fd](https://github.com/syrus-bot/syrus-bot/commit/ccb97fd8c683ee050db98ced19ede9bec093f8a3)), closes [#10](https://github.com/syrus-bot/syrus-bot/issues/10)
* **core:** enable ws voice states intent ([833397f](https://github.com/syrus-bot/syrus-bot/commit/833397f3a97f2a63ed4d0d1be7c81a7eb8fc6af7)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **music:** add eventHandler to manager ([62fedf6](https://github.com/syrus-bot/syrus-bot/commit/62fedf606ab60a60fd681dfafe633810438c0035)), closes [#19](https://github.com/syrus-bot/syrus-bot/issues/19)
* **music:** add fetchTracks and fix websocket handler ([bebb6dc](https://github.com/syrus-bot/syrus-bot/commit/bebb6dc96cd686457867ffed9789714b57c32e10)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **music:** add infoChannel attr to music player ([4673f5e](https://github.com/syrus-bot/syrus-bot/commit/4673f5ed061d1efeafcc3206b47a634ed376bd7d)), closes [#19](https://github.com/syrus-bot/syrus-bot/issues/19)
* **music:** add infrastructure for queue handling ([5dc2f80](https://github.com/syrus-bot/syrus-bot/commit/5dc2f80a30ff62d5bb1071611cc116164a673dd3)), closes [#19](https://github.com/syrus-bot/syrus-bot/issues/19)
* **music:** add rolling queue embed for queue stop ([cc80abd](https://github.com/syrus-bot/syrus-bot/commit/cc80abdd9c6b346de674199fd33a79867a1d1905)), closes [#19](https://github.com/syrus-bot/syrus-bot/issues/19)
* **music:** add rolling queue embed for track start ([71a6e2f](https://github.com/syrus-bot/syrus-bot/commit/71a6e2f83b1926d742428a143f6d2bc29501cc0b)), closes [#19](https://github.com/syrus-bot/syrus-bot/issues/19)
* **music:** add search queries ([dd3045c](https://github.com/syrus-bot/syrus-bot/commit/dd3045c4cd913c7e381bdac32c339edf2d2ca854)), closes [#20](https://github.com/syrus-bot/syrus-bot/issues/20)
* **music:** add stop ([e3c0424](https://github.com/syrus-bot/syrus-bot/commit/e3c042448664d16f43e039b9e920bc5573ef1793)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **music:** add volume ([cf2aa7e](https://github.com/syrus-bot/syrus-bot/commit/cf2aa7ec5ae5868daf401c7fdf66ae72c632f142)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **music:** implement music manager ([c876703](https://github.com/syrus-bot/syrus-bot/commit/c8767031f993d2a652882f5e73d3ddef927134bd)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **music:** remove infoChannel when stopped ([467de09](https://github.com/syrus-bot/syrus-bot/commit/467de09a7b4f93d87b426a248f90a81534004eb7)), closes [#19](https://github.com/syrus-bot/syrus-bot/issues/19)


### Performance Improvements

* **commands:** remove unnecessary await for skip ([35f3515](https://github.com/syrus-bot/syrus-bot/commit/35f3515a308844f2ace71c61ecf2ff52ba2205c1)), closes [#13](https://github.com/syrus-bot/syrus-bot/issues/13)
* **mongodb:** improve driver efficiency when retrieving guilds ([74941b5](https://github.com/syrus-bot/syrus-bot/commit/74941b508e793f36c1e6c8edd501958adec8413d))


### BREAKING CHANGES

* **i18n:** The behaviour of i18next has changed with this commit.
* **i18n:** This commit's breaking change is that the namespaces of command
internationalization moving means that older versions of Syrus' internationalization features will
break and fail to load anything.
* **commands:** Two new classes have been implemented into the client and changed project-wide for
a new command store and commands. This is not backwards compatible and modules written from this
branch forwards will not work on older versions of Syrus that do not have these new classes.
