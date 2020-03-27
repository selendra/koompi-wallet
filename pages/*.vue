// handle 404 page
<script>
export default {
  asyncData ({ redirect }) {
    return redirect('/')
  }
}
</script>