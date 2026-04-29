import "flag-icons/css/flag-icons.min.css";
import "v-phone-input/styles";

import {
  autocompletePhoneCountryInput,
  createVPhoneInput,
  selectPhoneCountryInput,
} from "v-phone-input";

export default defineNuxtPlugin((nuxtApp) => {
  const vPhoneInput = createVPhoneInput({
    ...selectPhoneCountryInput,
    ...autocompletePhoneCountryInput,
  });

  nuxtApp.vueApp.use(vPhoneInput);
});
