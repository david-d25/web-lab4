export default {
  components: {
    tetris_game: {
      esc_to_exit: "Press ESC to quit",
      before_start_msg: "Press Enter to start!",
      next_elem: "Next element",
      pls_give_points: "Postav'te lk plzzz 🙏",
      pause: "Paused, press Enter"
    },
    snake_game: {
      esc_to_exit: "Press ESC to quit",
      before_start_msg: "Press Enter to start!",
      pause: "Paused, press Enter"
    },
    user_dropdown: {
      log_out: "Log out",
      log_out_from_everywhere: "Log out from everywhere",
      log_in: "Log in",
      or: "or",
      register_verb: "Register"
    },
    language_selector: {
      label: "Language",
      languages: {
        english: "English",
        russian: "Russian"
      }
    },
    button_array_input: {
      custom_value: "Custom value:"
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
        unexpected_response: "Sorry, we've got unexpected response ({0})"
      },
      reg_confirm: {
        success: "Now you can sign to your account!",
        token_not_found: "Sorry, this link is invalid or outdated",
        invalid_token: "Sorry, this confirmation link is broken",
        default_error: "Sorry, there's a confirmation error ({0}})",
        unexpected_response: "Sorry, we've got unexpected response ({0}})"
      },
      already_logged_in: {
        message: "It looks like you have already logged in.",
        to_main: "Go to main page"
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
    not_found: {
      comment: "Not found"
    },
    main: {
      access_denied: {
        prefix: "Please ",
        link: "log in",
        postfix: " to access this page"
      },
      submit: "GO GO GO >>>",
      results: {
        title: "Previous results",
        hit: "Hit",
        hit_yes: "Yeah",
        hit_no: "Nope.",
        author: "Owner",
        time_created: "Created"
      },
      time: {
        just_now: "Just now",
        seconds: "{0} seconds ago",
        minutes: "{0}m ago",
        hours: "{0}h {1}m ago",
        days: "{0}d {1}h {2}m ago",
      },
      errors: {
        x_not_selected: "You have to select X",
        y_not_selected: "You have to select Y",
        r_not_selected: "You have to select R",
        y_incorrect: "Y must be a number",
        x_constraint_failed: "X must be in [-5; 3]",
        y_constraint_failed: "Y must be in (-3; 3)",
        r_constraint_failed: "R must be greater than 0",
        data_incorrect: "It looks like the data is incorrect. Please, check it again"
      }
    },
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
