module.exports = (Franz) => {
  const getMessages = function getMessages() {
    let count = 0;

    // get all the containers with overdue
    var overdue_inbox_all = document.querySelectorAll('.overdue')[3];
    item_text = overdue_inbox_all.getElementsByTagName("span")[1].innerText;
    if (item_text.localeCompare("All") == 0) {
      // if it is the "all" list, go for it
      local_count = parseInt(overdue_inbox_all.getElementsByTagName("span")[2].innerText);
      count += local_count;
    };

    Franz.setBadge(count);
  };

  Franz.loop(getMessages);
};