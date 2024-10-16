<template>
    <div class="enterprise-skeleton-wrapper">
        <v-skeleton-loader type="image" class="enterprise-skeleton" />
        <v-skeleton-loader type="image" class="enterprise-skeleton" />
        <v-skeleton-loader type="image" class="enterprise-skeleton" />
        <v-skeleton-loader type="image" class="enterprise-skeleton" />
        <v-skeleton-loader type="image" class="enterprise-skeleton" />
        <v-skeleton-loader type="image" class="enterprise-skeleton" />
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.enterprise-skeleton-wrapper {
    display: flex;

    >:not(:last-child) {
        margin-right: 30px;
    }
}

.enterprise-skeleton {
    flex-shrink: 0;
    height: 110px;
    width: 165px;

    @include responsive(lg) {
        width: 158px;
        margin-right: 32px;
    }

    @include responsive(xs) {
        height: 66px;
        width: 120px;
        margin-right: 8px;
    }
}
</style>
