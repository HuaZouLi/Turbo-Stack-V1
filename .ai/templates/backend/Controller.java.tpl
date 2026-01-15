package org.dromara.${module}.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.dromara.common.core.domain.R;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import org.dromara.common.excel.utils.ExcelUtil;
import org.dromara.common.idempotent.annotation.RepeatSubmit;
import org.dromara.common.log.annotation.Log;
import org.dromara.common.log.enums.BusinessType;
import org.dromara.common.mybatis.core.page.PageQuery;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.web.core.BaseController;
import org.dromara.${module}.domain.dto.${Entity}Dto;
import org.dromara.${module}.domain.vo.${Entity}Vo;
import org.dromara.${module}.service.I${Entity}Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * ${entityCn}管理
 *
 * @author ${author}
 * @since ${date}
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/${module}/${entityPath}")
public class ${Entity}Controller extends BaseController {

    private final I${Entity}Service ${entity}Service;

    /**
     * 查询${entityCn}列表
     */
    @SaCheckPermission("${module}:${entityPath}:list")
    @GetMapping("/list")
    public TableDataInfo<${Entity}Vo> list(${Entity}Dto dto, PageQuery pageQuery) {
        return ${entity}Service.selectPageList(dto, pageQuery);
    }

    /**
     * 导出${entityCn}列表
     */
    @SaCheckPermission("${module}:${entityPath}:export")
    @Log(title = "${entityCn}", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(${Entity}Dto dto, HttpServletResponse response) {
        List<${Entity}Vo> list = ${entity}Service.selectList(dto);
        ExcelUtil.exportExcel(list, "${entityCn}", ${Entity}Vo.class, response);
    }

    /**
     * 获取${entityCn}详细信息
     *
     * @param ${entityId} 主键
     */
    @SaCheckPermission("${module}:${entityPath}:query")
    @GetMapping("/{${entityId}}")
    public R<${Entity}Vo> getInfo(@NotNull(message = "主键不能为空") @PathVariable ${IdType} ${entityId}) {
        return R.ok(${entity}Service.selectById(${entityId}));
    }

    /**
     * 新增${entityCn}
     */
    @SaCheckPermission("${module}:${entityPath}:add")
    @Log(title = "${entityCn}", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public R<Void> add(@Validated(AddGroup.class) @RequestBody ${Entity}Dto dto) {
        return toAjax(${entity}Service.insert(dto));
    }

    /**
     * 修改${entityCn}
     */
    @SaCheckPermission("${module}:${entityPath}:edit")
    @Log(title = "${entityCn}", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody ${Entity}Dto dto) {
        return toAjax(${entity}Service.update(dto));
    }

    /**
     * 删除${entityCn}
     *
     * @param ${entityId}s 主键串
     */
    @SaCheckPermission("${module}:${entityPath}:remove")
    @Log(title = "${entityCn}", businessType = BusinessType.DELETE)
    @DeleteMapping("/{${entityId}s}")
    public R<Void> remove(@NotEmpty(message = "主键不能为空") @PathVariable ${IdType}[] ${entityId}s) {
        return toAjax(${entity}Service.deleteByIds(List.of(${entityId}s)));
    }
}
