<template>
  <RecipesListProfileView  v-if="userDetails" :uid="userDetails.uid"></RecipesListProfileView >
  <NewRecipeButton></NewRecipeButton>
</template>

<script>
import RecipesListProfileView from '@/components/RecipesListProfile'
import NewRecipeButton from '@/components/NewRecipeButton'
import { mapActions } from 'vuex'
import { actionTypes } from '@/store/modules/firebasedb'

export default {
  name: 'AppUserRecipes',
  components: { RecipesListProfileView, NewRecipeButton },
  data () {
    return {
      userDetails: null
    }
  },
  methods: {
    ...mapActions({
      getUserDetails: actionTypes.getUserDetails
    }),
    fetchUserDetails () {
      this.getUserDetails().then(userDetails => {
        this.userDetails = userDetails
      }).catch(error => {
        console.error(error)
      })
    }
  },
  mounted () {
    this.fetchUserDetails()
  },
  created () {
    this.fetchUserDetails()
  }
}
</script>
