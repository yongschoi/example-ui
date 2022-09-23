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
          <v-list-item router :to="{name: 'userlist'}" exact>
            <v-list-item-action>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Offset</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{name: 'userlistnooffsetpage'}" exact>
            <v-list-item-action>
              <v-icon>mdi-account-multiple-check</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>No Offset</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{name: 'userlistnooffset'}" exact>
            <v-list-item-action>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>No Offset Plus</v-list-item-title>
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
              <v-icon>mdi-gift</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Product</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item router :to="{name: 'product'}" exact>
            <v-list-item-action>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Product All</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{name: 'search'}" exact>
            <v-list-item-action>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Product Search</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router :to="{name: 'category'}" exact>
            <v-list-item-action>
              <v-icon>mdi-card-search</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Product Category</v-list-item-title>
            </v-list-item-content>
          </v-list-item>          
        </v-list-group>     

        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Shopping</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item router :to="{name: 'order'}" exact>
            <v-list-item-action>
              <v-icon>mdi-file-document-edit-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Order</v-list-item-title>
            </v-list-item-content>
          </v-list-item>  
          <v-list-item router :to="{name: 'orderlist'}" exact>
            <v-list-item-action>
              <v-icon>mdi-file-document-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Order List</v-list-item-title>
            </v-list-item-content>
          </v-list-item>                  
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