<template>
    <div class="admin-page">
        <HeaderAdmin></HeaderAdmin>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderAdmin from './header-admin'
export default {
    components: {
        HeaderAdmin,
    }
}
</script>