<template>
  <div class="container flex sm:flex-col">
    <div v-for="item in footerContents" :key="item.hContent"
      class="xl:w-1/4 lg:w-1/4 2xl:w-1/4 md:w-1/4 flex flex-col px-[15px]">
      <h1 class="text-xl text-[#d3b5a3] uppercase font-medium mb-[13px] md:text-center sm:text-center">
        {{ item.hContent }}
      </h1>
      <ul v-for="listItem in item.listContent" :key="listItem.li1" class="mb-4 flex flex-col space-y-2">
        <li class="sm:text-center md:text-center" v-if="listItem.li1">
          <a class="text-[#C4C4C4] text-lg hover:text-[#d3b5a3]" href="#">{{
      listItem.li1
    }}</a>
        </li>
        <li class="sm:text-center md:text-center" v-if="listItem.li2">
          <a class="text-[#C4C4C4] text-lg hover:text-[#d3b5a3]" href="#">{{
      listItem.li2
    }}</a>
        </li>
        <li class="sm:text-center md:text-center" v-if="listItem.li3">
          <a class="text-[#C4C4C4] text-lg hover:text-[#d3b5a3]" href="#">{{
      listItem.li3
    }}</a>
        </li>
        <li class="sm:text-center md:text-center" v-if="listItem.li4">
          <a class="text-[#C4C4C4] text-lg hover:text-[#d3b5a3]" href="#">{{
      listItem.li4
    }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerContents: [
        {
          hContent: "Về chúng tôi",
          listContent: [
            {
              li1: "Về Eden Garden",
              li2: "Đảm bảo giá tốt nhất",
              li3: "Điều khoản & Điều kiện",
              li4: "Chính sách quyền riêng tư",
            },
          ],
        },
        {
          hContext: "Dịch vụ",
          listContent: [
            {
              li1: "Quầy bar mặt trời",
              li2: "Massage & chăm sóc sức khỏe",
              li3: "Đưa đón sân bay",
            },
          ],
        },
        {
          hContent: "Khám phá",
          listContent: [
            {
              li1: "Vị trí",
              li2: "Liên hệ với chúng tôi",
            },
          ],
        },
        {
          hContent: "Khách sạn",
          listContent: [
            {
              li1: "Eden Garden Hotel",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped></style>
