<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item router :to="{name: 'home'}" exact>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action> 
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router :to="{name: 'axiostest'}" exact>
          <v-list-item-action>
            <v-icon>mdi-cursor-default-click</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Axios Test</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>User</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item router :to="{name: 'user'}" exact>
            <v-list-item-action>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>User All</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{name: 'score'}" exact>
            <v-list-item-action>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>User Score Rating</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{name: 'excludezero'}" exact>
            <v-list-item-action>
              <v-icon>mdi-account-details-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>User Exclude Zero</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>mdi-basket</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Product</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>      
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark fixed color="indigo">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>example</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String
    },
    data: () => ({
      drawer: null
    })
  }
</script>