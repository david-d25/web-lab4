export default {
  components: {
    language_selector: {
      label: "Language",
      languages: {
        english: "English",
        russian: "Russian"
      }
    },
    header: {
      settings: "Settings",
      student_info: "Davtyan D. A., variant 20131, group P3201",
      title: "Labwork 4",
      log_in: "Log in",
      anonymous: "Anonymous",
      close: "close",
      or: "or",
      register_verb: "Register"
    },
    select_user_modal: {
      title: "Search user",
      before_search_hint: "Use search to find user",
      no_results: "No results"
    },
    queue_manager_item: {
      controls: {
        profile: "Profile",
        make_moderator: "Switch to moderator",
        make_admin: "Switch to admin",
        remove: "Remove"
      }
    },
  },
  pages: {
    edit_queue: {
      title: "Queue editing",
      not_found: "Queue not found",
      go_back_btn: "Return",
      form: {
        hints: {
          name: "Name",
          id: "Link"
        },
        errors: {
          queue_not_found: "This queue no longer exists. Someone may have deleted it.",
          data_incorrect: "Please, check the data you entered",
        }
      },
      errors: {
        not_found: "Queue not found"
      }
    },
    settings: {
      log_out: "Log out",
      author_vk: "Author (VK)"
    },
    login: {
      title: "Login",
      form: {
        email_hint: "Email",
        password_hint: "Password",
        log_in_button: "Log in",
        empty_email_hint: "EMail is empty",
        empty_password_hint: "Password is empty"
      },
      forgot_password_link: "Forgot password?",
      dont_have_account: "Don't have an account?",
      register_link: "Register",
      errors: {
        login_failed: "Incorrect email or password",
        data_not_full: "Please, check the entered data",
        default_error: "Error logging in: {0}",
        internal_error: "Internal server error ಠ_ಠ\n({0})",
        unexpected_response: "Sorry, we've got unexpected response ({0}})"
      },
      reg_confirm: {
        success: "Now you can sign to your account!",
        token_not_found: "Sorry, this link is invalid or outdated",
        invalid_token: "Sorry, this confirmation link is broken",
        default_error: "Sorry, there's a confirmation error ({0}})",
        unexpected_response: "Sorry, we've got unexpected response ({0}})"
      }
    },
    registration: {
      title: "Registration",
      form: {
        hints: {
          name: "Name",
          surname: "Surname",
          email: "Email",
          password: "Password",
          repeated_password: "Password again",
        },
        error_hints: {
          name_empty: "Name is empty",
          surname_empty: "Surname is empty",
          email_empty: "EMail is empty",
          password_empty: "Password is empty",
          repeated_password_empty: "Repeated password is empty",
          name_mismatch: "Your name should have 2..50 English or Russian letters",
          surname_mismatch: "Your surname should have 2..50 English or Russian letters",
          password_mismatch: "Your password should have from 8 to 4096 characters",
          passwords_dont_match: "Passwords don't match"
        },
        submit_button: "Go!"
      },
      already_have_account: "Already have an account?",
      login_link: "Log in",
      success: {
        yay: "Yaay!",
        comment_email: "You will get an email with confirmation link, just follow it.",
        comment_page: "This page can be closed"
      },
      success_title: "Success!",
      errors: {
        data_incorrect: "Please, check the data you entered",
        email_is_registered: "Sorry, this email is already registered",
        email_is_registering: "Someone is registering with this email. If it's you, check your mailbox",
        default_error: "Sorry, we couldn't register you: {0}",
        internal_error: "Internal server error ಠ_ಠ ({0})",
        unexpected_response: "Sorry, we've got unexpected response: {0}"
      }
    },
    new_queue: {
      title: "Let's create a queue!",
      title_easter: "Nope.",
      form: {
        name: "Name of your queue",
        id: "Link to you queue",
        submit: "Create!"
      },
      please_log_in: {
        prefix: "Please, ",
        link: "log in",
        postfix: " to use this page"
      },
      error_hints: {
        name_mismatch: "Name must have 2..128 letters",
        id_mismatch: "Link must have 1..120 english letters, 0-9 or _"
      },
      errors: {
        wrong_data: "Please, check the data you entered",
        id_exists: "Sorry, this link already exists",
        default_error: "Sorry, there's an error ({0})",
        internal_error: "Internal server error ಠ_ಠ ({0})",
        unexpected_response: "Sorry, we've got unexpected response: {0}"
      }
    },
    not_found: {
      comment: "Not found"
    },
    search: {
      title: "Search",
      searchbox_placeholder: "Search everywhere...",
      search_groups: {
        queues: {
          title: "Queues",
          button_text: "All queues"
        },
        groups: {
          title: "Groups",
          button_text: "All groups"
        },
        users: {
          title: "Users",
          button_text: "All users"
        }
      },
      no_results: "No results",
      errors: {
        default_error: "Error doing search ({0})",
        internal_error: "Internal server error ({0})",
        unexpected_response: "Unexpected server response ({0})"
      }
    },
    queue: {
      title: "Queue",
      not_found: {
        title: "Queue not found",
        advice: {
          prefix: "Try using ",
          link: "search"
        }
      },
      controls: {
        open_button: "Open",
        close_button: "Close",
        less_button: "Less",
        more_button: "More",
        enter_button: "Enter",
        leave_button: "Leave",
        edit: "Edit"
      },
      queue_closed: "Queue is closed",
      login_to_enter: {
        prefix: "",
        link: "Log in",
        postfix: " to enter"
      },
      queue_empty: {
        title: "There're no people",
        enter_advice: "Be the first to enter!"
      },
      errors: {
        must_be_member: "You must me a member of this queue to enter",
        queue_closed: "The queue is closed",
        already_entered: "You've already entered",
        not_entered: "You haven't entered this queue",
        internal_error: "Internal server error ({0})",
        queue_removed: "This queue has been just removed",
        user_not_in_queue: "User isn't in the queue. Please, reload the page",
        wrong_target_position: "Please, select another position",
        not_enough_privileges: "You're not privileged for this"
      },
      long_polling: {
        errors: {
          queue_not_found: "Sorry, this queue no longer exists",
          connection_error: "Unable to connect to server ({0})",
          internal_error: "Connection lost (internal server error)",
          reconnecting: "Connection lost, trying to reconnect...",
          offline: "You're offline, we're trying to reconnect..."
        }
      }
    },
    queues: {
      title: "Queues",
      searchbox_placeholder: "Search queues...",
    },
    user: {
      title: "User",
      edit: "Edit",
      not_found: {
        title: "Пользователь не найден",
        advice: {
          prefix: "Попробуйте воспользоваться ",
          link: "поиском"
        }
      }
    },
    users: {
      title: "Users",
      searchbox_placeholder: "Search users...",
    },
    edit_user: {
      title: "Edit",
      form: {
        hints: {
          name: "Name",
          surname: "Surname"
        }
      },
      errors: {
        wrong_data: "Please, check the data you entered"
      },
      go_back_btn: "Return",
      please_log_in: {
        prefix: "Please ",
        link: "log in",
        postfix: " to use this page"
      },
    }
  },
  common: {
    you_are_offline: "You're offline",
    unknown_error: "Unknown error",
    internal_server_error: "Internal server error ({0})",
    response_error: "Sorry, we've got an error ({0})",
    access_denied: "Access denied",
    error_loading_app: "Error loading app ({0})",
    unexpected_response: "Unexpected server response ({0})",
    form_constraints: {
      user: {
        name: "Name must have 2..50 English or Russian letters",
        surname: "Surname must have 2..50 English or Russian letters"
      },
      queue: {
        name: "Name must have 2..128 symbols",
        id: "Link must have 1..64 English letters, 0-9 or _"
      }
    }
  }
}
