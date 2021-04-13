using System;
using System.Collections.Generic;
using STDentalLibrary.Models.Report;

namespace STDentalLibrary.Repositories
{
    public interface IReportRepository
    {
        //задолженность на дату
        IEnumerable<DeptOfDate> GetDeptOfDate(DateTime dateReport);

        IEnumerable<DeptOfDate> GetDeptOfDate(int staffId, DateTime dateReport);

        IEnumerable<DeptOfDate> GetDeptOfDate(int staffId, DateTime dateReport, int patientId);

        IEnumerable<DeptOfDate> GetDeptOfDate(DateTime dateReport, int patientId);

        //количество пациентов по годам
        IEnumerable<PatientsGroupByYear> GetPatientsGroupByYear(DateTime startDate, DateTime endDate);

        //использованные материалы за период
        IEnumerable<MaterialsUsedForPeriod> GetMaterialsUsedForPeriods(DateTime startDate, DateTime endDate);

        //оплата за период

        //талоны за период

        //остаток материалов
        IEnumerable<RemainderOfMaterials> GetRemainderOfMaterialses();
    }
}
