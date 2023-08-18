let URI = {

    //Login
    'usersLogin': 'UserAuthentication/AuthenticateSSPUserAsync',

    //Create shift timing
    'getShiftTimingList': 'CreateShift/ShiftTimingList',
    'createShiftTiming': 'CreateShift/AddClassTimeTable',
    'updateShiftTiming': 'CreateShift/UpdateClassTimeTable',
    'findShiftTiming': 'CreateShift/GetTimeTableAccessbyid',
    'deleteShiftTiming' : 'CreateShift/DeleteClassTimetable',

    'getShiftList': 'AllotShift/TimeTableAccess',
    'getClassDropDownList': 'AllotShift/BindClass',
    'shiftActiveStatus': 'AllotShift/SetActive'
}

export { URI }