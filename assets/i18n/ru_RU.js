export default {
  components: {
    language_selector: {
      label: "Язык",
      languages: {
        english: "Английский",
        russian: "Русский"
      }
    },
    header: {
      settings: "Настройки",
      student_info: "Давтян Д. А., вариант 20131, группа P3201",
      title: "Лаба 4",
      log_in: "Войти",
      anonymous: "Аноним",
      close: "закрыть",
      or: "или",
      register_verb: "Зарегистрироваться"
    },
    select_user_modal: {
      title: "Найти пользователя",
      before_search_hint: "Используйте поиск, чтобы найти пользователя",
      no_results: "Нет результатов"
    },
    queue_manager_item: {
      controls: {
        profile: "Профиль",
        make_moderator: "Сделать модератором",
        make_admin: "Сделать администратором",
        remove: "Удалить"
      }
    },
  },
  pages: {
    edit_queue: {
      title: "Редактирование",
      not_found: "Такой очереди нет",
      go_back_btn: "Вернуться",
      form: {
        hints: {
          name: "Название",
          id: "Ссылка"
        },
        errors: {
          queue_not_found: "Эта очередь больше не существует. Возможно, кто-то только что её удалил.",
          data_incorrect: "Пожалуйста, проверьте введённые данные"
        }
      },
      errors: {
        not_found: "Очередь не найдена"
      }
    },
    settings: {
      log_out: "Выйти",
      author_vk: "Автор (VK)"
    },
    login: {
      title: "Вход",
      form: {
        email_hint: "Email",
        password_hint: "Пароль",
        log_in_button: "Войти",
        empty_email_hint: "Пустой EMail",
        empty_password_hint: "Пустой пароль"
      },
      forgot_password_link: "Забыли пароль?",
      dont_have_account: "Ещё нет аккаунта?",
      register_link: "Зарегистрироваться",
      errors: {
        login_failed: "Неправильный email или пароль",
        data_not_full: "Пожалуйста, проверьте введённые данные",
        default_error: "Ошибка входа: {0}",
        internal_error: "Внутренняя ошибка сервера ಠ_ಠ\n({0})",
        unexpected_response: "Неизвестный ответ сервера ({0}})"
      },
      reg_confirm: {
        success: "Теперь вы можете войти в аккаунт!",
        token_not_found: "Эта ссылка недействительна или устарела",
        invalid_token: "Похоже, эта ссылка подержит ошибки",
        default_error: "Возникла ошибка при подтверждении ({0}})",
        unexpected_response: "Неизвестный ответ сервера ({0}})"
      },
      already_logged_in: {
        message: "Похоже, вы уже вошли.",
        to_main: "Перейти на главную страницу"
      }
    },
    registration: {
      title: "Регистрация",
      form: {
        hints: {
          name: "Имя",
          surname: "Фамилия",
          email: "Email",
          password: "Пароль",
          repeated_password: "Повтор пароля"
        },
        error_hints: {
          name_empty: "Имя пустое",
          surname_empty: "Фамилия пустое",
          email_empty: "EMail пуст",
          password_empty: "Пароль пуст",
          repeated_password_empty: "Повтор пароля пуст",
          name_mismatch: "Имя должно иметь 2..50 английских или русских символов",
          surname_mismatch: "Фамилия должно иметь 2..50 английских или русских символов",
          password_mismatch: "Пароль должен иметь от 8 до 4096 символов",
          passwords_dont_match: "Пароли не совпадают"
        },
        submit_button: "Готово"
      },
      already_have_account: "Уже есть аккаунт?",
      login_link: "Войти",
      success: {
        yay: "Ура!",
        comment_email: "Вы получите письмо со ссылкой для подтверждения адреса.",
        comment_page: "Эту страницу можно закрыть"
      },
      success_title: "Готово!",
      errors: {
        data_incorrect: "Пожалуйста, проверьте введённые данные",
        email_is_registered: "Этот EMail уже зарегистрирован",
        email_is_registering: "Кто-то уже регистрируется с этим EMail. Если это вы, проверьте вашу почту",
        default_error: "К сожалению, нам не удалось вас зарегистрировать: {0}",
        internal_error: "Внутренняя ошибка сервера ಠ_ಠ ({0})",
        unexpected_response: "Неожиданный ответ от сервера: {0}"
      }
    },
    not_found: {
      comment: "По этой ссылке ничего не нашлось"
    },
    main: {
      access_denied: {
        prefix: "",
        link: "Войдите, ",
        postfix: "чтобы использовать эту страницу"
      }
    },
  },
  common: {
    you_are_offline: "Вы офлайн",
    unknown_error: "Неизвестная ошибка",
    internal_server_error: "Внутренняя ошибка сервера",
    response_error: "Ошибка при обращении к серверу ({0})",
    access_denied: "Доступ закрыт",
    error_loading_app: "Ошибка загрузки приложения ({0})",
    unexpected_response: "Неожиданный ответ от сервера ({0})",
    form_constraints: {
      user: {
        name: "Имя должно иметь 2..50 английских или русских символов",
        surname: "Фамилия должно иметь 2..50 английских или русских символов"
      },
      queue: {
        name: "Имя должно иметь 2..128 символов",
        id: "Ссылка должна иметь 1..64 английских букв, 0-9 или _"
      }
    }
  }
}
