// Preserve older incoming project hashes after moving records to dedicated pages.
(() => {
  const legacy = {"copycat":"research/#copycat","crzne":"research/#crzne","scholarqa":"research/#scholarqa","trace-corpus":"research/#trace-corpus","grit":"research/#grit","theorica":"research/#theorica","k1":"research/#k1","lucent":"research/#lucent","noesis":"research/#noesis","vektor":"research/#vektor","somno":"projects/#somno","hush":"projects/#hush","orynt":"projects/#orynt","lattice":"projects/#lattice","open-tools":"projects/#open-tools","agnxiv":"building/#agnxiv","kernellum":"building/#kernellum","greengroove":"building/#greengroove","aiyes":"recognition/#aiyes","qhack":"recognition/#qhack","iris":"recognition/#iris","issdc":"recognition/#issdc","prayaas":"recognition/#prayaas"};
  Object.assign(legacy,{"all-research":"research/","all-building":"building/","all-projects":"projects/","all-recognition":"recognition/"});
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  if (Object.prototype.hasOwnProperty.call(legacy,id) && !document.getElementById(id)) location.replace(legacy[id]);
})();
