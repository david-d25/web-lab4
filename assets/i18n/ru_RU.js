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
    new_queue: {
      title: "Давайте создадим очередь!",
      title_easter: "Давайте без «Давайте»",
      form: {
        name: "Название очереди",
        id: "Ссылка на очередь",
        submit: "Создать!"
      },
      please_log_in: {
        prefix: "",
        link: "Войдите",
        postfix: ", чтобы создавать очереди"
      },
      error_hints: {
        name_mismatch: "Имя должно содержать 2..128 символов",
        id_mismatch: "Ссылка должна иметь 1..120 английских символов, 0-9 или _"
      },
      errors: {
        wrong_data: "Пожалуйста, проверьте введённые данные",
        id_exists: "Такая ссылка уже есть",
        default_error: "Не получилось создать очередь: {0}",
        internal_error: "Внутренняя ошибка сервера ಠ_ಠ ({0})",
        unexpected_response: "Неожиданный ответ от сервера: {0}"
      }
    },
    not_found: {
      comment: "По этой ссылке ничего не нашлось"
    },
    search: {
      title: "Поиск",
      searchbox_placeholder: "Искать везде...",
      search_groups: {
        queues: {
          title: "Очереди",
          button_text: "Все очереди"
        },
        groups: {
          title: "Группы",
          button_text: "Все группы"
        },
        users: {
          title: "Пользователи",
          button_text: "Все пользователи"
        }
      },
      no_results: "Нет результатов",
      errors: {
        default_error: "Ошибка поиска ({0})",
        internal_error: "Внтуренняя ошибка сервера ({0})",
        unexpected_response: "Неожиданный ответ от сервера ({0})"
      }
    },
    queue: {
      title: "Очередь",
      not_found: {
        title: "Очередь не найдена",
        advice: {
          prefix: "Попробуйте ",
          link: "воспользоваться поиском"
        }
      },
      controls: {
        open_button: "Открыть",
        close_button: "Закрыть",
        less_button: "Свернуть",
        more_button: "Раскрыть",
        enter_button: "Войти",
        leave_button: "Выйти",
        edit: "Редактировать"
      },
      queue_closed: "Очередь закрыта",
      login_to_enter: {
        prefix: "",
        link: "Авторизируйтесь,",
        postfix: " чтобы войти"
      },
      queue_empty: {
        title: "Тут ещё никого нет...",
        enter_advice: "...но вы можете войти!"
      },
      errors: {
        must_be_member: "Вы должны быть в списке участников, чтобы войти",
        queue_closed: "Очеред закрыта",
        already_entered: "Вы уже вошли",
        not_entered: "Вы не в очереди",
        internal_error: "Внутренняя ошибка сервера ({0})",
        queue_removed: "Эту очередь только что удалили",
        user_not_in_queue: "Пользователя нет в очереди. Попробуйте перезагрузить страницу",
        wrong_target_position: "Выберите другую позицию",
        not_enough_privileges: "У вас недостаточно прав для этого действия"
      },
      long_polling: {
        errors: {
          queue_not_found: "Эта очередь больше не существует",
          connection_error: "Проблемы с подключением ({0})",
          internal_error: "Проблемы с подключением (ошибка на стороне сервера)",
          reconnecting: "Восстанавливаем соединение...",
          offline: "Офлайн-режим, пытаемся соединиться..."
        }
      }
    },
    queues: {
      title: "Очереди",
      searchbox_placeholder: "Искать очереди...",
    },
    user: {
      title: "Пользователь",
      edit: "Редактировать",
      not_found: {
        title: "User not found",
        advice: {
          prefix: "Try using ",
          link: "search"
        }
      }
    },
    users: {
      title: "Люди",
      searchbox_placeholder: "Искать людей...",
    },
    edit_user: {
      title: "Редактирование",
      form: {
        hints: {
          name: "Имя",
          surname: "Фамилия"
        }
      },
      errors: {
        wrong_data: "Пожалуйста, проверьте введенные данные"
      },
      go_back_btn: "Вернуться",
      please_log_in: {
        prefix: "",
        link: "Войдите",
        postfix: ", чтобы использовать эту страницу"
      },
    }
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
