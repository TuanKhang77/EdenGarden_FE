<template>
  <div class="formControl">
    <span class="formControl_title text-sm leading-[150%]">
      {{ label }}
    </span>
    <div class="flexGap mt-3" style="--gap-x: 12px; --gap-y: 12px">
      <div class="flexGapWrap">
        <label class="labelUpload" for="imgURL">
          <button
            aria-label="upload image"
            class="itemIMG flex items-center justify-center bg-[#F6F9FC] cursor-pointer"
            @click="openFilePicker"
          >
            <i class="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M7.447 3.106A2 2 0 019.237 2h5.527a2 2 0 011.789 1.106L17.5 5H20a3 3 0 013 3v10a3 3 0 01-3 3H4a3 3 0 01-3-3V8a3 3 0 013-3h2.5l.947-1.894ZM9 13a3 3 0 116 0 3 3 0 01-6 0Zm3-5a5 5 0 100 10 5 5 0 000-10Z"
                  clip-rule="evenodd"
                />
              </svg>
            </i>
          </button>
          <input
            accept="image/*"
            id="imgURL"
            type="file"
            @change="onFileChange"
            multiple
            style="display: none"
          />
        </label>
        <!-- Hiển thị ảnh đã chọn -->
        <template v-if="selectedImages.length > 0">
          <img
            v-for="(image, index) in selectedImages"
            :key="index"
            :src="image"
            class="w-16 h-16 object-cover ml-4 mt-2"
            @click="removeImage(index)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Upload Image",
    },
  },
  data() {
    return {
      selectedImages: [], // Thêm selectedImages vào dữ liệu của component
    };
  },
  methods: {
    onFileChange(event) {
      const files = event.target.files; // Lấy danh sách tệp đã chọn
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          // Kiểm tra xem tệp có phải là ảnh không
          if (file && file.type.startsWith("image/")) {
            // Tạo đường dẫn ảnh từ đối tượng File
            const imageURL = URL.createObjectURL(file);
            this.selectedImages.push(imageURL); // Thêm đường dẫn vào mảng
          }
        }
      }
    },
    removeImage(index) {
      this.selectedImages.splice(index, 1);
    },
    openFilePicker() {
      // Mở dialog chọn file khi nhấn vào button
      document.getElementById("imgURL").click();
    },
  },
};
</script>

<style scoped>
.divForm input[type="file"] {
  cursor: pointer;
}
.divForm {
  width: 100%;
  font-size: 16px;
}
.flexGapWrap {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--gap-x-negative);
  margin-top: var(--gap-x-negative);
}
.flexGap {
  --gap-x: 8px;
  --gap-y: 8px;
  --gap-x-negative: calc(var(--gap-x) * -1);
  --gap-y-negative: calc(var(--gap-y) * -1);
}
.labelUpload {
  margin-top: var(--gap-x);
  margin: var(--gap-y);
}
.itemIMG {
  border-radius: 0.25rem;
  height: 60px;
  overflow: hidden;
  width: 60px;
  position: relative;
}
</style>
