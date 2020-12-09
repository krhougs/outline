// @flow
import { find } from "lodash";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import { languages, languageOptions } from "shared/i18n";
import Flex from "components/Flex";
import NoticeTip from "components/NoticeTip";
import useCurrentUser from "hooks/useCurrentUser";
import useStores from "hooks/useStores";
import { detectLanguage } from "utils/language";

function Icon(props) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21 18H16L14 16V6C14 4.89543 14.8954 4 16 4H28C29.1046 4 30 4.89543 30 6V16C30 17.1046 29.1046 18 28 18H27L25.4142 19.5858C24.6332 20.3668 23.3668 20.3668 22.5858 19.5858L21 18ZM16 15.1716V6H28V16H27H26.1716L25.5858 16.5858L24 18.1716L22.4142 16.5858L21.8284 16H21H16.8284L16 15.1716Z"
        fill="#2B2F35"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 13H4C2.89543 13 2 13.8954 2 15V25C2 26.1046 2.89543 27 4 27H5L6.58579 28.5858C7.36684 29.3668 8.63316 29.3668 9.41421 28.5858L11 27H16C17.1046 27 18 26.1046 18 25V15C18 13.8954 17.1046 13 16 13ZM9 17L6 16.9681C6 16.9681 5 17.016 5 18C5 18.984 6 19 6 19H8.5H10C10 19 9.57627 20.1885 8.38983 21.0831C7.20339 21.9777 5.7197 23 5.7197 23C5.7197 23 4.99153 23.6054 5.5 24.5C6.00847 25.3946 7 24.8403 7 24.8403L9.74576 22.8722L11.9492 24.6614C11.9492 24.6614 12.6271 25.3771 13.3051 24.4825C13.9831 23.5879 13.3051 23.0512 13.3051 23.0512L11.1017 21.262C11.1017 21.262 11.5 21 12 20L12.5 19H14C14 19 15 19.0319 15 18C15 16.9681 14 16.9681 14 16.9681L11 17V16C11 16 11.0169 15 10 15C8.98305 15 9 16 9 16V17Z"
        fill="#2B2F35"
      />
      <path
        d="M23.6672 12.5221L23.5526 12.1816H23.1934H20.8818H20.5215L20.4075 12.5235L20.082 13.5H19.2196L21.2292 8.10156H21.8774L21.5587 9.06116L20.7633 11.4562L20.5449 12.1138H21.2378H22.8374H23.5327L23.3114 11.4546L22.5072 9.05959L22.1855 8.10156H22.768L24.7887 13.5H23.9964L23.6672 12.5221Z"
        fill="#2B2F35"
        stroke="#2B2F35"
      />
    </svg>
  );
}

export default function LanguagePrompt() {
  const { auth, ui } = useStores();
  const { t } = useTranslation();
  const user = useCurrentUser();
  const language = detectLanguage();

  if (language === "en_US" || language === user.language) {
    return null;
  }

  if (!languages.includes(language)) {
    return null;
  }

  const option = find(languageOptions, (o) => o.value === language);
  const optionLabel = option ? option.label : "";

  return (
    <NoticeTip>
      <Flex align="center">
        <LanguageIcon />
        <span>
          <Trans>
            Outline is available in your language {{ optionLabel }}, would you
            like to change?
          </Trans>
          <br />
          <a
            onClick={() => {
              auth.updateUser({
                language,
              });
              ui.setLanguagePromptDismissed();
            }}
          >
            {t("Change Language")}
          </a>{" "}
          &middot; <a onClick={ui.setLanguagePromptDismissed}>{t("Dismiss")}</a>
        </span>
      </Flex>
    </NoticeTip>
  );
}

const LanguageIcon = styled(Icon)`
  margin-right: 12px;
`;
