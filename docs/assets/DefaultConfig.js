(function (w) {
    'use strict'
    // modify the data here to your liking
    let app_data = {
            "github-repo": "Eden333/swskillsimu", // Set to null to let auto-detect from Github Page default URL, unreliable though
            maxCharacterLevel: 79, // Default max level will be used if the value cannot be found in a character's JSON data
            
            // How many times the warning notification will show to let user know that the skill preview videos are blocked by browser's autoplay policy.
            // 0 will disable it
            // Less than 0 will show the notification unlimited times
            // More than 0 is the count.
            videoBlockedPolicyWarningCount: 3
        },
        // SP table.
         table_SkillPoint = {
            // Default SP for level up that is not found within the "Special" below
            DefaultSP: 2,
            // Special cases, specify an amount of SP to receive on these character levels
            Special: {
                // Should be all numbers, putting anything else at your own risk.
                // The format is: `[number] Level: [number] The amount of SP`
                /*
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 1,
                5: 3,
                6: 1,
                7: 1,
                8: 1,
                9: 1,
                10: 5,
                15: 5,
                20: 10,
                25: 5,
                30: 5,
                35: 5,
                40: 10,
                45: 5,
                50: 5,
                55: 5,
                60: 5,
                61: 1,
                62: 1,
                63: 1,
                64: 1,
                65: 3,
                66: 1,
                67: 1,
                68: 1,
                69: 1,
                70: 3,
                71: 1,
                72: 1,
                73: 3,
                74: 3,
                75: 3,
                76: 3
                */
            }
        },
        table_Character = {
            /*
            Should be as format below, putting anything else at your own risk.
            The format is: `[string] Character Name: [object] character property`
            + Character Name: Full name preferred, but can be anything.
            + Character property object contains 4 properties: ("enabled" can be omitted, "reason" can be omitted)
                                         url: The relative URL to the character's skill tree simulator page.
                                         selectImage: The big image of character selection on skill simulator's homepage.
                                                      Can be `null` to not use any image but doing so at your own risk
                                         enabled: Determine if the character is allowed to access or not. Default: true
                                                  (for example: the skill tree of said character is in building)
                                         reason: The reason when not enabled
            */
            "Haru Estia": {
                url: "Haru",
                selectImage: "assets/images/Haru_Select.png"
            },
            "Erwin Arclight": {
                url: "Erwin",
                selectImage: "assets/images/Erwin_Select.png"
            },
            "Lily Bloomerchen": {
                url: "Lily",
                selectImage: "assets/images/Lily_Select.png"
            },
            "Stella Unibell": {
                url: "Stella",
                selectImage: "assets/images/Stella_Select.png"
            },
            "Jin Seipatsu": {
                url: "Jin",
                selectImage: "assets/images/Jin_Select.png"
            },
            "Iris Yuma": {
                url: "Iris",
                selectImage: "assets/images/Iris_Select.png"
            },
			"Chii Aruel": {
                url: "Chii",
                selectImage: "assets/images/Chii_Select.png"
			},
			"Ephnel": {
                url: "Ephnel",
                selectImage: "assets/images/Ephnel_Select.png"
			},
			"Lee Nabi": {
                url: "Nabi",
                selectImage: "assets/images/Nabi_Select.png"
			},
        };

    // Debug purpose. Don't modify unless you know what're you doing or testing something
    let debug_data = {
        use_h264: null, // False to force disable H264, true to force using H264, null to "use H264 if the web browser support it"
        use_vp9: null, // False to force disable VP9, true to force using VP9, null to "use VP9 if the web browser support it"
        videoPreviewPanelHeight: "240px" // The height of the panel which contains skill preview video
    };

    // Do not modify anything below this line

    if (!app_data["github-repo"]) {
        // This whole thing is untested, trust auto-detect at your own risk
        let currentHost = w.document.location.hostname;
        if (currentHost.endsWith("github.io")) {
            let username = currentHost.substring(0, currentHost.length - ".github.io".length),
                repoName = w.document.location.pathname;
            if (repoName === "/") {
                repoName = w.document.location.hostname;
            } else {
                repoName = repoName.ctrim("\/");
                let slashFound = repoName.indexOf("/");
                if (slashFound !== -1) {
                    repoName = repoName.substr(0, slashFound);
                }
            }
            app_data["github-repo"] = username + "/" + repoName;
        } else {
            delete app_data["github-repo"];
        }
    }

    let skillTreeData;
    if (!w.hasOwnProperty("SkillTreeData")) {
        skillTreeData = {};
        Object.defineProperty(w, "SkillTreeData", {
            value: skillTreeData,
            configurable: false,
            enumerable: true,
            writable: false
        });
    } else {
        skillTreeData = w.SkillTreeData;
    }

    Object.defineProperty(skillTreeData, "SkillPointTable", {
        value: deepFreeze(table_SkillPoint),
        configurable: false,
        enumerable: true,
        writable: false
    });

    Object.defineProperty(skillTreeData, "CharacterTable", {
        value: deepFreeze(table_Character),
        configurable: false,
        enumerable: true,
        writable: false
    });

    if (typeof (w.appdata) !== "object") {
        Object.defineProperty(w, "appdata", {
            value: Object.freeze(Object.assign({
                "github-repo": "Eden333/swskillsimu",
                maxCharacterLevel: 79,
                use_h264: null,
                use_vp9: null,
                videoPreviewPanelHeight: "240px"
            }, app_data, debug_data)),
            writable: false,
            configurable: false
        });
    }
})(window);