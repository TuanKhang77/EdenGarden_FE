<template>
  <div class="styleServices"></div>
</template>

<style lang="css">
.button-confirm,
.button-cancel {
  width: 120px;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-confirm {
  background-color: #0a75ca;
  color: white;
  border-radius: 4px;
  margin-right: 8px;
}

.button-cancel {
  background-color: #ff0000;
  color: white;
  border-radius: 4px;
}

.modalContainer {
  width: 1000px;
}

.divSharedHeader {
  border: 0px solid transparent;
}

.divForm {
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 1px #ffffff;
  display: inline-flex;
  position: relative;
  width: 350px;
  font-size: 14px;
}

.divForm:focus-within {
  box-shadow: 0 0 0 1px #007aff;
}
</style>
