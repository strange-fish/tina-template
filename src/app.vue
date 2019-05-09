<config>
{
  "window": {
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#073a64"
  },
  "pages": [
    "./pages/index.vue"
  ]
}
</config>

<script lang="ts">
import { appify, MyApp, MyStore } from './base/'

@appify(new MyStore(), { pages: [], tabBarList: [] })
class NewApp extends MyApp {

}

export default NewApp
</script>
