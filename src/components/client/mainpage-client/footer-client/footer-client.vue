<template>
  <footer class="footer">
    <div class="container sm:max-w-[335px] md:max-w-[670px] 2xl:max-w-[1280px] lg:max-w-[1280px] xl:max-w-[1280px]">
      <div class="flex items-center justify-center sm:flex-col">
        <div
          class="logo sm:mb-[10px] sm:flex sm:items-center sm:justify-center xl:w-1/6 2xl:w-1/6 lg:w-1/6 xl:px-[15px] lg:px-[15px] 2xl:px-[15px]">
          <router-link :to="{ name: 'homePage' }" class="flex items-center justify-center">
            <img class="h-auto w-[160px]" src="@/assets/logo-edengarden-nobuffer.png" alt />
          </router-link>
        </div>
        <div
          class="infor md:px-[15px] sm:mb-[10px] sm:flex sm:items-center sm:justify-center sm:flex-col xl:w-4/6 2xl:w-4/6 lg:w-4/6 xl:pl-[120px] lg:pl-[120px] 2xl:pl-[120px]">
          <div class="text-lg font-normal text-[#c4c4c4] pb-[15px] md:text-center sm:text-base sm:text-center">
            Add: Hang Bong Center - Quận Hoàn Kiếm - Hà Nội - Việt Nam
          </div>
          <div
            class="contactInfor sm:items-center sm:justify-center flex md:items-center md:justify-center 2xl:items-start lg:items-start xl:items-start 2xl:justify-start lg:justify-start xl:justify-start flex-col">
            <a href="tel:+84988590818"
              class="text-2xl text-[#d3b5a3] hover:text-white font-normal flex items-center justify-center whitespace-nowrap">
              <i>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z" />
                </svg>
              </i>
              <span class="ml-2" disabled>(+84) 98 8590818</span>
            </a>
            <a href="mailto:tunghem345@gmail.com"
              class="text-xl leading-[3rem] text-[#d3b5a3] hover:text-white font-normal flex items-center justify-center whitespace-nowrap">
              <span>Email: tunghem345@gmail.com</span>
            </a>
          </div>
        </div>
        <div
          class="social sm:flex sm:items-center sm:justify-center sm:flex-col xl:w-1/6 2xl:w-1/6 lg:w-1/6 xl:pl-[70px] lg:pl-[70px] 2xl:pl-[70px]">
          <p class="text-[#c4c4c4] text-lg font-normal sm:hidden leading-6 mb-5">
            Find us on
          </p>
          <ul class="flex space-x-1 sm:space-x-5">
            <!-- tripadvisor -->
            <li>
              <a class="bg-[#d3b5a3] text-[#111] rounded-full flex items-center justify-center w-8 h-8" href="#"
                target="_blank">
                <i>
                  <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor"
                      d="M23.011 9.532c.281-1.207 1.175-2.416 1.175-2.416h-4.012c-2.251-1.455-4.981-2.226-8.013-2.226-3.14 0-5.978.78-8.214 2.251H.186s.885 1.186 1.17 2.386C.624 10.534.189 11.749.189 13.084c0 3.316 2.697 6.008 6.012 6.008 1.891 0 3.571-.885 4.681-2.254l1.275 1.916 1.291-1.936c.57.736 1.32 1.336 2.205 1.74 1.455.66 3.092.736 4.592.18 3.106-1.154 4.696-4.621 3.556-7.726-.209-.556-.48-1.051-.81-1.485l.02.005zm-3.171 8.072c-1.2.445-2.505.395-3.67-.143-.824-.383-1.503-.982-1.988-1.727-.201-.299-.375-.623-.503-.971-.146-.395-.22-.803-.259-1.215-.074-.832.045-1.673.405-2.453.54-1.164 1.501-2.051 2.701-2.496 2.49-.914 5.25.361 6.166 2.841.916 2.481-.36 5.245-2.835 6.163h-.017zm-9.668-1.834c-.863 1.271-2.322 2.113-3.973 2.113-2.646 0-4.801-2.156-4.801-4.797 0-2.641 2.156-4.802 4.801-4.802s4.798 2.161 4.798 4.802c0 .164-.03.314-.048.479-.081.811-.341 1.576-.777 2.221v-.016zM3.15 13.023c0 1.641 1.336 2.971 2.971 2.971s2.968-1.33 2.968-2.971c0-1.635-1.333-2.964-2.966-2.964-1.636 0-2.971 1.329-2.971 2.964H3.15zm12.048 0c0 1.641 1.329 2.971 2.968 2.971 1.636 0 2.965-1.33 2.965-2.971 0-1.635-1.329-2.964-2.965-2.964-1.635 0-2.971 1.329-2.971 2.964h.003zm-11.022 0c0-1.071.869-1.943 1.936-1.943 1.064 0 1.949.873 1.949 1.943 0 1.076-.869 1.951-1.949 1.951-1.081 0-1.951-.875-1.951-1.951h.015zm12.033 0c0-1.071.869-1.943 1.949-1.943 1.066 0 1.937.873 1.937 1.943 0 1.076-.87 1.951-1.952 1.951-1.079 0-1.949-.875-1.949-1.951h.015zM12.156 5.94c2.161 0 4.111.389 5.822 1.162-.645.018-1.275.131-1.906.36-1.515.555-2.715 1.665-3.375 3.125-.315.66-.48 1.359-.541 2.065-.225-3.076-2.76-5.515-5.881-5.578C7.986 6.34 9.967 5.94 12.112 5.94h.044z" />
                  </svg>
                </i>
              </a>
            </li>
            <!-- google -->
            <li>
              <a class="bg-[#d3b5a3] text-[#111] rounded-full flex items-center justify-center w-8 h-8"
                href="http://localhost:8080/" target="_blank">
                <i>
                  <svg class="w-5 h-5" id="Layer_1" style="enable-background: new 0 0 56.6934 56.6934" version="1.1"
                    viewBox="0 0 56.6934 56.6934" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path fill="currentColor"
                      d="M51.981,24.4812c-7.7173-0.0038-15.4346-0.0019-23.1518-0.001c0.001,3.2009-0.0038,6.4018,0.0019,9.6017  c4.4693-0.001,8.9386-0.0019,13.407,0c-0.5179,3.0673-2.3408,5.8723-4.9258,7.5991c-1.625,1.0926-3.492,1.8018-5.4168,2.139  c-1.9372,0.3306-3.9389,0.3729-5.8713-0.0183c-1.9651-0.3921-3.8409-1.2108-5.4773-2.3649  c-2.6166-1.8383-4.6135-4.5279-5.6388-7.5549c-1.0484-3.0788-1.0561-6.5046,0.0048-9.5805  c0.7361-2.1679,1.9613-4.1705,3.5708-5.8002c1.9853-2.0324,4.5664-3.4853,7.3473-4.0811c2.3812-0.5083,4.8921-0.4113,7.2234,0.294  c1.9815,0.6016,3.8082,1.6874,5.3044,3.1163c1.5125-1.5039,3.0173-3.0164,4.527-4.5231c0.7918-0.811,1.624-1.5865,2.3908-2.4196  c-2.2928-2.1218-4.9805-3.8274-7.9172-4.9056C32.0723,4.0363,26.1097,3.995,20.7871,5.8372  C14.7889,7.8907,9.6815,12.3763,6.8497,18.0459c-0.9859,1.9536-1.7057,4.0388-2.1381,6.1836  C3.6238,29.5732,4.382,35.2707,6.8468,40.1378c1.6019,3.1768,3.8985,6.001,6.6843,8.215c2.6282,2.0958,5.6916,3.6439,8.9396,4.5078  c4.0984,1.0993,8.461,1.0743,12.5864,0.1355c3.7284-0.8581,7.256-2.6397,10.0725-5.24c2.977-2.7358,5.1006-6.3403,6.2249-10.2138  C52.5807,33.3171,52.7498,28.8064,51.981,24.4812z" />
                  </svg>
                </i>
              </a>
            </li>
            <!-- facebook -->
            <li>
              <a class="bg-[#d3b5a3] text-[#111] rounded-full flex items-center justify-center w-8 h-8"
                href="https://www.facebook.com/noriko.shinokawa.3/" target="_blank">
                <i>
                  <svg class="w-5 h-5" enable-background="new 0 0 56.693 56.693" id="Layer_1" version="1.1"
                    viewBox="0 0 56.693 56.693" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path fill="currentColor"
                      d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029  c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77  L40.43,21.739z" />
                  </svg>
                </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr class="my-[30px]" />
      <div>
        <FooterList></FooterList>
      </div>
      <hr class="my-[30px]" />
      <div class="flex items-center justify-center sm:flex-col">
        <div class="flex sm:items-center sm:justify-center sm:pb-[10px] md:w-1/3 2xl:w-1/3 lg:w-1/3 xl:w-1/3">
          <span class="acceptedCard text-base text-[#d3b5a3]">
            Chấp nhận thẻ
          </span>
          <img class="h-[24px] w-auto ml-[10px]"
            src="https://gmpremiumhotel.com/UploadFile/About-JM-Hospitality/visa-mastercard.png" alt />
        </div>
        <div class="xl:w-2/3 2xl:w-2/3 lg:w-2/3 md:w-2/3 copyright flex items-end justify-end">
          <p class="text-base text-[#666666] sm:text-center">
            © 2024 Eden Garden Hotel Hanoi. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import FooterList from "./footer-child/footer-list.vue";
export default {
  components: {
    FooterList,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.footer {
  background-color: #191617;
  padding-top: 60px;
  padding-bottom: 40px;
}
</style>
