function translatePage () {
    if (targetEncoding === 1) {
      currentEncoding = 1
      targetEncoding = 2
      translateButtonObject.innerHTML = msgToTraditionalChinese
      saveToLocal.set(targetEncodingCookie, targetEncoding, 2)
      translateBody()
      if (isSnackbar) btf.snackbarShow(snackbarData.cht_to_chs)
    } else if (targetEncoding === 2) {
      currentEncoding = 2
      targetEncoding = 1
      translateButtonObject.innerHTML = msgToSimplifiedChinese
      saveToLocal.set(targetEncodingCookie, targetEncoding, 2)
      translateBody()
      if (isSnackbar) btf.snackbarShow(snackbarData.chs_to_cht)
    }
    rm.hideRightMenu();
  }
